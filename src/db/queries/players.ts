import * as SQLite from "expo-sqlite";

export async function addPlayers(
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
      res.push(name);
    } else {
      db.runAsync(`INSERT INTO players (name) VALUES(?)`, [name]);
    }
  }
  return res;
}
