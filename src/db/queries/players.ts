import * as SQLite from "expo-sqlite";

export async function checkForExistingPlayers(
  db: SQLite.SQLiteDatabase,
  playersList: string[],
) {
  let res: Array<string> = [];
  for (const name of playersList) {
    const result = await db.getEachAsync<{ result: boolean }>(
      `SELECT EXISTS(SELECT 1 FROM players WHERE name = ?) AS value_exists VALUES(?)`,
      [name],
    );
    if (result) {
      // FIXME: with the way this database is intended to be structured, this check should be a separate function,
      // and the actual insertion will be its own standalone
      res.push(name);
    } else {
      db.runAsync(`INSERT INTO players (name) VALUES(?)`, [name]);
    }
  }
  return res;
}

export async function addPlayers(
  db: SQLite.SQLiteDatabase,
  playersList: string[],
) {
  // Do simple batch command
  const placedholders = playersList.map(() => "(?)").join(", ");
  await db.runAsync(
    `INSERT INTO players (name) VALUES ${placedholders}`,
    playersList,
  );
}
