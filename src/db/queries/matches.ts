import * as SQLite from "expo-sqlite";

export async function createNewMatch(db: SQLite.SQLiteDatabase) {
  const result = db.runAsync(`INSERT INTO matches (played_at) VALUES(?);`, [
    new Date().toISOString(),
  ]);
  return (await result).lastInsertRowId;
}

export async function getRecentMatches(db: SQLite.SQLiteDatabase) {
  return await db.getAllAsync<{ match_id: number; played_at: string }>(
    `SELECT * FROM matches ORDER BY played_at DESC LIMIT 5;`,
  );
}
