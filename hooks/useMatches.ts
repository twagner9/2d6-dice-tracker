import { createNewMatch, getRecentMatches } from "@/src/db/queries/matches";
import { useSQLiteContext } from "expo-sqlite"; // Makes SQLite database globally accessible -- see _layout.tsx for why this works
import { useCallback, useEffect, useState } from "react";

export function useMatches() {
  const db = useSQLiteContext();
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMatches = useCallback(async () => {
    setLoading(true);
    const data = await getRecentMatches(db);
    setMatches(data);
    setLoading(false);
  }, [db]);

  const addMatch = async () => {
    const id = await createNewMatch(db);
    await fetchMatches();
    return id;
  };

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  return { matches, loading, addMatch, refreshMatches: fetchMatches };
}
