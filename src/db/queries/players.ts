import { Player } from "@/app/(tabs)";
import * as SQLite from "expo-sqlite";

export async function checkForExistingPlayers(
  db: SQLite.SQLiteDatabase,
  players: string[],
): Promise<string[]> {
  const placeholders = players.map(() => "(?)").join(", ");

  const rows = await db.getAllAsync<{ id: number; name: string }>(
    `SELECT name FROM players WHERE name IN (${placeholders})`,
    players,
  );

  return rows.map((r) => r.name);
}

export async function getPlayerIds(
  db: SQLite.SQLiteDatabase,
  players: string[],
) {
  const placeholders = players.map(() => "(?)").join(", ");
  const rows = await db.getAllAsync<{ player_id: number }>(
    `SELECT player_id FROM players WHERE name IN (${placeholders})`,
    players,
  );

  return rows.map((r) => r.player_id);
}

export async function addPlayers(db: SQLite.SQLiteDatabase, players: string[]) {
  // Do simple batch command
  const placeholders = players.map(() => "(?)").join(", ");

  const rows = await db.runAsync(
    `INSERT INTO players (name) VALUES ${placeholders}`,
    players,
  );
  return rows.changes;
}

function getNames(players: Player[]) {
  let names = [];
  for (const player of players) {
    names.push(player.name);
  }

  return names;
}
