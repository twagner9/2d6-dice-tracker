import { RecentMatchesResult } from "@/app/(tabs)/matches";
import * as SQLite from "expo-sqlite";

export async function createNewMatch(db: SQLite.SQLiteDatabase) {
  const curDate = new Date();
  const year = curDate.getFullYear();
  const month = curDate.getMonth();
  const day = curDate.getDay();
  const hour = curDate.getHours();
  const minute = curDate.getMinutes();
  const minutes = curDate.getMinutes();

  const formattedDate = `${month}-${day}-${year} ${hour > 12 ? hour - 12 : hour}:${minute < 10 ? `0${minute}` : minute} ${hour >= 12 ? "PM" : "AM"}`;
  const result = db.runAsync(`INSERT INTO matches (played_at) VALUES(?);`, [
    formattedDate,
  ]);
  return (await result).lastInsertRowId;
}

export async function getRecentMatches(
  db: SQLite.SQLiteDatabase,
  numRecords: number,
  order: string,
): Promise<RecentMatchesResult[]> {
  const sortOrder = order === "Most recent" ? "DESC" : "ASC";
  const matchRes = await db.getAllAsync<{
    match_id: number;
    played_at: string;
  }>(
    `SELECT * FROM matches ORDER BY match_id ${sortOrder} LIMIT ${numRecords};`,
  );

  if (matchRes.length === 0) {
    return [];
  }

  const matchIds = matchRes.map((m) => m.match_id);
  const placeholders = matchIds.map(() => "?").join(", ");
  const [playersRes, playerDataRes, rollsRes] = await Promise.all([
    db.getAllAsync<{ player_id: number; name: string }>(
      `SELECT * FROM players`,
    ),
    db.getAllAsync<{
      match_id: number;
      player_id: number;
      is_winner: boolean;
    }>(
      `SELECT * FROM match_players WHERE match_id IN (${placeholders})`,
      matchIds,
    ),
    db.getAllAsync<{
      match_id: number;
      roll_value: string;
      count: number;
    }>(`SELECT * FROM rolls WHERE match_id IN (${placeholders})`, matchIds),
  ]);

  // Instead of trying to return all of the data and handling what to do with it
  // in the frontend, handle it here. Group players and rolls by match ID, so that all
  // that is required is to loop over the final array and each HistoryRecord's data is
  // already grouped together.
  const playerNameMap = new Map<number, string>(
    playersRes.map((p) => [p.player_id, p.name]),
  );

  const playersByMatch = new Map<
    number,
    { playerId: number; name: string; winner: boolean }[]
  >();

  // Pair players with match ID
  for (const p of playerDataRes) {
    const list = playersByMatch.get(p.match_id) || [];
    list.push({
      playerId: p.player_id,
      name: playerNameMap?.get(p.player_id) ?? "Unknown",
      winner: Number(p.is_winner) === 1,
    });
    playersByMatch.set(p.match_id, list);
  }

  // Pair rolls with match_id
  const rollsByMatch = new Map<
    number,
    { rollValue: string; count: number }[]
  >();
  for (const r of rollsRes) {
    const list = rollsByMatch.get(r.match_id) || [];
    list.push({ rollValue: r.roll_value, count: r.count });
    rollsByMatch.set(r.match_id, list);
  }

  // Return the result
  return matchRes.map((m) => ({
    id: m.match_id,
    date: m.played_at,
    players: playersByMatch.get(m.match_id) || [],
    rolls: rollsByMatch.get(m.match_id) || [],
  }));
}
