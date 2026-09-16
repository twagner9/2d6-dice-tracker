import Button from "@/src/components/Button";
import PlayersScreen from "@/src/components/PlayersScreen";
import RollTrackerList from "@/src/components/RollTrackerList";
import { addPlayers } from "@/src/db/queries/players";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [newGameButtonActive, setNewGameButtonActive] =
    useState<boolean>(false);
  const [showNameConfirmDialog, setShowNameConfirmDialog] =
    useState<boolean>(false);
  const MIN_PLAYERS = 3;
  const MAX_PLAYERS = 6;
  const [numPlayers, setNumPlayers] = useState<number>(MIN_PLAYERS);
  const [players, setPlayers] = useState<string[]>(Array(numPlayers).fill(""));
  const db = useSQLiteContext();

  // Update the new game button based on the number of players available
  useEffect(() => {
    // .every will search every name in players and check that it meets the condition
    setNewGameButtonActive(players.every((name) => name && name.trim() !== ""));
  }, [players]);

  const updatePlayersList = (playerNumber: number, newName: string) => {
    setPlayers((current) => {
      const updated = [...current];
      updated[playerNumber - 1] = newName;
      return updated;
    });
  };

  function changeNumPlayers(shouldIncrease: boolean) {
    if (shouldIncrease) {
      if (numPlayers < MAX_PLAYERS) {
        setNumPlayers(numPlayers + 1);
      }
    } else {
      if (numPlayers > MIN_PLAYERS) {
        setNumPlayers(numPlayers - 1);
      }
    }
  }

  function startGameClick() {
    // TODO: execute the logic for creating a new match
    // 1. pull the entered players and ensure there are valid strings in
    // each input, and that the length of the array

    if (numPlayers < MIN_PLAYERS || numPlayers > MAX_PLAYERS) {
      alert("Catan must have 3-6 players. Delete a player to continue.");
      return;
    }
    for (const name of players) {
      if (!name || name.trim() === "") {
        alert("Name cannot be empty. Ensure all name fields have content.");
        return;
      }
    }

    // TODO: now that the proper number of players are available and the names for each
    // player are valid, check the names in the database. If any are found, list the players and prompt
    // the user to specify if these are returning players, and say that if they are not, they should be more
    // specific on the names in question to differentiate between players.

    // NOTE: async functions require using .then() syntax to access values returned from them,
    // because they are in Promise form otherwise
    addPlayers(db, players).then((potentialReturningPlayers: string[]) => {
      if (potentialReturningPlayers.length > 0) {
        // TODO: dialog or alert should appear with focus and ask the user if names
        // in this list are returning players or not. If not, return before starting game
        // and tell the user to modify the names to differentiate.
        setShowNameConfirmDialog(true);
      }
    });

    setGameStarted(true);
  }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          style={styles.scrollContainer}
        >
          <Text style={styles.beginGameText}>Track a New Game</Text>
          {gameStarted ? (
            <View style={styles.diceTrackerContainer}>
              <RollTrackerList />
            </View>
          ) : (
            // {/* TODO: add the player input logic here */}
            <View>
              <PlayersScreen
                updatePlayers={updatePlayersList}
                changeNumPlayers={changeNumPlayers}
                numPlayers={numPlayers}
              />
              <Button
                label={"Start Game"}
                theme={"new game"}
                onPress={startGameClick}
                enabled={newGameButtonActive}
              />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  beginGameText: {
    fontSize: 24,
    color: "#fff",
    alignSelf: "center",
    padding: 20,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#25292e",
    textAlign: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    textDecorationStyle: "solid",
    color: "#fff",
  },
  diceTrackerContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
    borderRadius: 2,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 125,
  },
});
