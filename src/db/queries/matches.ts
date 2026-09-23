import {
  MatchesTableData,
  MatchPlayersTableData,
  RollsTableData,
} from "@/src/components/HistoryRecord";
import * as SQLite from "expo-sqlite";

export async function createNewMatch(db: SQLite.SQLiteDatabase) {
  const result = db.runAsync(`INSERT INTO matches (played_at) VALUES(?);`, [
    new Date().toISOString(),
  ]);
  return (await result).lastInsertRowId;
}

export async function getRecentMatches(
  db: SQLite.SQLiteDatabase,
  numRecords: number,
  order: string,
) {
  /* TODO: this needs to be more comprehensive; it should not ONLY pull from the matches table, but
   * from all tables to appropriately load the data required to fill a HistoryRecord component
   * 1. Get numRecords match_ids in the order specified; also store the match_ids and the played_at data during this step
   * 2. Use match_id values to pull all the other data: player names, winner, roll data
   * 	a. Done a table at a time? Or can this command return all deisred data at once?
   * 3. Return the resulting data so it can be looped over and displayed in the frontend
   */

  let matchData: MatchesTableData[] = [];
  let playersData: MatchPlayersTableData[] = [];
  let rollsData: RollsTableData[] = [];
  const finalResult = [];
  const sortOrder = order === "Most recent" ? "DESC" : "ASC";
  const matchRes = await db.getAllAsync<{
    match_id: number;
    played_at: string;
  }>(
    `SELECT * FROM matches ORDER BY match_id ${sortOrder} LIMIT ${numRecords};`,
  );

  matchData = matchRes.map((r) => ({
    id: r.match_id,
    date: r.played_at,
  }));
  finalResult.push(matchData);

  const matchIds = matchData.map((m) => m.id);
  const placeholders = matchIds.map(() => "(?)").join(", ");
  const playersRes = await db.getAllAsync<{
    match_id: number;
    player_id: number;
    winner: boolean;
  }>(`SELECT * FROM match_players WHERE match_id IN ${placeholders}`, matchIds);
  playersData = playersRes.map((r) => ({
    matchId: r.match_id,
    playerId: r.player_id,
    winner: r.winner,
  }));
  finalResult.push(playersData);

  // TODO: Will have to create a map of player names and IDs based on this pull, so that loading the data is bounded only by the number of players
  // in the game, rather than re-querying or searching a separate array

  const rollsRes = await db.getAllAsync<{
    match_id: number;
    roll_value: string;
    count: number;
  }>(`SELECT * FROM rolls WHERE match_id IN ${placeholders}`, matchIds);
  rollsData = rollsRes.map((r) => ({
    matchId: r.match_id,
    rollValue: r.roll_value,
    count: r.count,
  }));
  finalResult.push(rollsData);
}
