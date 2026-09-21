import { Player } from "@/app/(tabs)";
import * as SQLite from "expo-sqlite";

export async function checkForExistingPlayers(
  db: SQLite.SQLiteDatabase,
  players: Player[],
): Promise<Player[]> {
  let names = getNames(players);
  const placeholders = names.map(() => "(?)").join(", ");

  const rows = await db.getAllAsync<{ id: number; name: string }>(
    `SELECT name FROM players WHERE name IN (${placeholders})`,
    names,
  );

  return rows.map((r) => ({ name: r.name, id: r.id }));
}

export async function getPlayerIds(
  db: SQLite.SQLiteDatabase,
  players: Player[],
) {}

export async function addPlayers(db: SQLite.SQLiteDatabase, players: Player[]) {
  // Do simple batch command
  const names = getNames(players);
  const placedholders = names.map(() => "(?)").join(", ");

  await db.runAsync(
    `INSERT INTO players (name) VALUES ${placedholders}`,
    names,
  );
}

function getNames(players: Player[]) {
  let names = [];
  for (const player of players) {
    names.push(player.name);
  }

  return names;
}
