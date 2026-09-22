import { Player } from "@/app/(tabs)";
import * as SQLite from "expo-sqlite";

export async function saveMatch(
  db: SQLite.SQLiteDatabase,
  matchId: number,
  players: Player[],
  winner: number,
) {
  // TODO: insert each player_id into the database alongside the match_id, and whether that player won
  // Creates a string of players.length where each value is (?), effectively creating n different "(?), (?), (?)" until length of players
  // then, join joins them together into one single string
  const placeholders = players.map(() => "(?, ?, ?)").join(", ");

  // Creates an array for each player that contains the matchId, playerId, and whether this player is the winner. When paired with the
  // placeholders, it just goes down the line, pairing each value with the corresponding placeholder all through the array
  const values = players.flatMap((player) => [
    matchId,
    player.id,
    player.id === winner ? 1 : 0,
  ]);

  await db.runAsync(
    `INSERT INTO match_players (match_id, player_id, is_winner) VALUES ${placeholders}`,
    values,
  );
}
