import { initDatabase } from "@/src/db/schema";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

// SQLiteProvider will call the initialization function that sets up the database with the specified schema
// for tracking Catan matches
export default function RootLayout() {
  return (
    <>
      <SQLiteProvider databaseName="CatanTracker.db" onInit={initDatabase}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SQLiteProvider>
    </>
  );
}
