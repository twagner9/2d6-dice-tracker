import Button from "@/src/components/Button";
import RollTrackerList from "@/src/components/RollTrackerList";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Index() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [players, setPlayers] = useState<string[]>([]);

  function startGameClick() {
    // TODO: execute the logic for creating a new match
    // 1. pull the entered players and ensure there are valid strings in
    // each input, and that the length of the array
    setPlayers([...players, "John"]);
    setPlayers([...players, "Slink"]);
    setPlayers([...players, "Dotty"]);
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
    <SafeAreaProvider style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Text style={styles.beginGameText}>Track a New Game</Text>
        {gameStarted ? (
          <View style={styles.diceTrackerContainer}>
            <RollTrackerList />
          </View>
        ) : (
          // {/* TODO: add the player input logic here */}
          <View>
            <Button
              label={"Start Game"}
              theme={"new game"}
              onPress={startGameClick}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaProvider>
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
    justifyContent: "space-evenly",
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
});
