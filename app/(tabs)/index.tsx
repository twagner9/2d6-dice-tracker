import Button from "@/src/components/Button";
import ConfirmNameDialog from "@/src/components/ConfirmNamesModal";
import PlayersScreen from "@/src/components/PlayersScreen";
import RollTrackerList from "@/src/components/RollTrackerList";
import { saveMatch } from "@/src/db/queries/match_players";
import { createNewMatch } from "@/src/db/queries/matches";
import { addPlayers, checkForExistingPlayers } from "@/src/db/queries/players";
import { saveRolls } from "@/src/db/queries/rolls";
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

export type Player = {
  id: number;
  name: string;
};

export type NewPlayer = {};

export default function Index() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [newGameButtonActive, setNewGameButtonActive] =
    useState<boolean>(false);
  const [showNameConfirmDialog, setShowNameConfirmModal] =
    useState<boolean>(false);
  const [showWinnerSelectionModal, setShowWinnerSelectionModal] =
    useState<boolean>(false);
  const MIN_PLAYERS = 3;
  const MAX_PLAYERS = 6;
  const [numPlayers, setNumPlayers] = useState<number>(MIN_PLAYERS);
  const [players, setPlayers] = useState<Player[]>(
    Array(numPlayers).fill({ name: "", id: -1 }),
  );
  const [possibleReturningPlayers, setPossibleReturningPlayers] = useState<
    string[]
  >([]);
  const db = useSQLiteContext();
  const [matchId, setMatchId] = useState<number>(-1);
  const [winningPlayerId, setWinningPlayerId] = useState<number>(-1);
  const [pendingRolls, setPendingRolls] = useState<number[]>([]);

  // Update the new game button based on the number of players available
  useEffect(() => {
    // .every will search every name in players and check that it meets the condition
    setNewGameButtonActive(
      players.every((player) => player.name && player.name.trim() !== ""),
    );
    setNumPlayers(players.length);
  }, [players]);

  const updatePlayersList = (playerNumber: number, newName: string) => {
    setPlayers((current) => {
      const updated = [...current];
      updated[playerNumber - 1].name = newName;
      return updated;
    });
  };

  function changeNumPlayers(shouldIncrease: boolean) {
    if (shouldIncrease) {
      if (numPlayers < MAX_PLAYERS) {
        setPlayers((previousPlayers) => [
          ...previousPlayers,
          { name: "", id: -1 },
        ]);
      }
    } else {
      if (numPlayers > MIN_PLAYERS) {
        setPlayers((players) => players.slice(0, -1));
      }
    }
  }

  function startGameClick() {
    if (numPlayers < MIN_PLAYERS || numPlayers > MAX_PLAYERS) {
      alert("Catan must have 3-6 players. Delete a player to continue.");
      return;
    }
    for (const player of players) {
      if (!player.name || player.name.trim() === "") {
        alert("Name cannot be empty. Ensure all name fields have content.");
        return;
      }
    }

    // NOTE: async functions require using .then() syntax to access values returned from them,
    // because they are in Promise form otherwise
    checkForExistingPlayers(db, players)
      .then((potentialReturningPlayers: Player[]) => {
        if (potentialReturningPlayers.length > 0) {
          let names = [];
          for (const player of players) {
            names.push(player.name);
          }
          setPossibleReturningPlayers(names);
          setShowNameConfirmModal(true);
        } else {
          startGame();
        }
      })
      .catch((error) => console.error(error));
  }

  const startGame = async () => {
    setShowNameConfirmModal(false);
    if (possibleReturningPlayers.length !== players.length) {
      addPlayers(
        db,
        players.filter(
          (player) => !possibleReturningPlayers.includes(player.name),
        ),
      );
    }
    checkForExistingPlayers(db, players).then();
    setMatchId(await createNewMatch(db));
    setGameStarted(true);
  };

  // WILL BE PASSED TO A MODAL THAT PROMPTS THE PLAYER TO SELECT THE WINNER
  function getWinner(winnerId: number) {
    setWinningPlayerId(winnerId);
  }

  const handleEndMatch = (rolls: number[]) => {
    setPendingRolls(rolls);
    setShowWinnerSelectionModal(true);
  };

  const onGameFinished = () => {
    // TODO: save the game -- will want to have boolean state that will specify if there has been a new game pushed to the database.
    // This way, it doesn't require querying the database every single time the history tab is clicked, but only the first time the app
    // is loaded or when there is an update
    // Match created, players inserted; now we finished the game. So, who won? How will match_players be filled?
    // Answer: need to keep the match ID AND all player IDs
    console.log(matchId, players);
    saveMatch(db, matchId, players, winningPlayerId);
    saveRolls(db, matchId, pendingRolls);
  };

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
              <RollTrackerList finishGame={onGameFinished} />
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
                onPress={startGameClick}
                enabled={newGameButtonActive}
                containerStyle={styles.newGameButtonContainer}
                buttonStyle={styles.newGameButton}
                labelStyle={styles.newGameLabel}
                slopValue={20}
              />
            </View>
          )}
          {showNameConfirmDialog && (
            <ConfirmNameDialog
              players={possibleReturningPlayers}
              shouldShowModal={setShowNameConfirmModal}
              startGame={startGame}
            />
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
    // alignItems: "center",
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
    flexGrow: 1,
    width: "100%",
  },
  scrollContent: {
    paddingBottom: 125,
  },

  // ------------------ FOR BUTTON COMPONENT STYLING -------------------------------
  newGameButtonContainer: {
    width: 130,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    padding: 5,
  },
  newGameButton: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  newGameLabel: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 20,
  },
});
