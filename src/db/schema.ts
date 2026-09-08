import * as SQLite from "expo-sqlite";

export async function initDatabase(db: SQLite.SQLiteDatabase) {
  // const db = await SQLite.openDatabaseAsync("CatanTracker");
  try {
    await db.execAsync(`PRAGMA foreign_keys = ON;`);
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS matches (
  match_id INTEGER PRIMARY KEY AUTOINCREMENT, 
  played_at TEXT NOT NULL
  );`,
    );
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS players (
  player_id INTEGER PRIMARY KEY AUTOINCREMENT, 
  name TEXT NOT NULL
  );`,
    );
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS match_players (
  match_id INTEGER NOT NULL, 
  player_id INTEGER NOT NULL, 
  is_winner BOOLEAN, 
  PRIMARY KEY (match_id, player_id), 
  FOREIGN KEY (match_id) REFERENCES matches (match_id) ON DELETE CASCADE, 
  FOREIGN KEY (player_id) REFERENCES players (player_id) ON DELETE CASCADE
  );`,
    );
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS rolls (
  match_id INTEGER NOT NULL, 
  roll_value INTEGER NOT NULL, 
  count INTEGER NOT NULL, 
  PRIMARY KEY (match_id, roll_value),
  FOREIGN KEY(match_id) REFERENCES matches (match_id) ON DELETE CASCADE
  );`,
    );
  } catch (error) {
    console.error("Failed database initialization:", error);
    throw error;
  }
}
