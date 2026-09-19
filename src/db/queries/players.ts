import * as SQLite from "expo-sqlite";

export async function checkForExistingPlayers(
  db: SQLite.SQLiteDatabase,
  players: string[],
) {
  let existing: Array<string> = [];
  const placeholders = players.map(() => "(?)").join(", ");
  const rows = await db.getAllAsync<{ name: string }>(
    `SELECT name FROM players WHERE name IN (${placeholders})`,
    players,
  );

  return rows.map((r) => r.name);
}

export async function addPlayers(db: SQLite.SQLiteDatabase, players: string[]) {
  // Do simple batch command
  const placedholders = players.map(() => "(?)").join(", ");
  await db.runAsync(
    `INSERT INTO players (name) VALUES ${placedholders}`,
    players,
  );
}
