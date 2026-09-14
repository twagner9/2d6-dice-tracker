import Button from "@/src/components/Button";
import PlayersScreen from "@/src/components/PlayersScreen";
import RollTrackerList from "@/src/components/RollTrackerList";
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
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    if (players.length >= 3 && players.length <= 6) {
      setNewGameButtonActive(true);
    } else {
      setNewGameButtonActive(false);
    }
  }, [players]);

  function startGameClick() {
    // TODO: execute the logic for creating a new match
    // 1. pull the entered players and ensure there are valid strings in
    // each input, and that the length of the array

    if (players.length < 3 || players.length > 6) {
      alert("Catan must have 3-6 players. Delete a player to continue.");
      return;
    }
    for (const name of players) {
      if (!name || name.trim() === "") {
        alert("Name cannot be empty. Ensure all name fields have content.");
        return;
      }
    }
    // TODO: check that the
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
              <PlayersScreen />
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
