import * as SQLite from "expo-sqlite";

export async function saveRolls(
  db: SQLite.SQLiteDatabase,
  matchId: number,
  rolls: number[],
) {
  const placeholders = rolls.map(() => "(?, ?, ?)").join(",");
  const values = rolls.flatMap((count, index) => [matchId, index + 2, count]);
  await db.runAsync(
    `INSERT INTO rolls (match_id, roll_value, count) VALUES ${placeholders}`,
    values,
  );
}
