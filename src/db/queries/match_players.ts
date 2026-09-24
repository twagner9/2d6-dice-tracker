import * as SQLite from "expo-sqlite";

export async function saveMatch(
  db: SQLite.SQLiteDatabase,
  matchId: number,
  playerIds: number[],
  winner: number,
) {
  // TODO: insert each player_id into the database alongside the match_id, and whether that player won
  // Creates a string of players.length where each value is (?), effectively creating n different "(?), (?), (?)" until length of players
  // then, join joins them together into one single string
  const placeholders = playerIds.map(() => "(?, ?, ?)").join(", ");

  // Creates an array for each player that contains the matchId, playerId, and whether this player is the winner. When paired with the
  // placeholders, it just goes down the line, pairing each value with the corresponding placeholder all through the array
  const values = playerIds.flatMap((id) => [
    matchId,
    id,
    id === winner ? true : false,
  ]);

  const result = await db.runAsync(
    `INSERT INTO match_players (match_id, player_id, is_winner) VALUES ${placeholders}`,
    values,
  );

  return result.changes;
}
