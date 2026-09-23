import Button from "@/src/components/Button";
import ConfirmNameDialog from "@/src/components/ConfirmNamesModal";
import PlayersScreen from "@/src/components/PlayersScreen";
import RollTrackerList from "@/src/components/RollTrackerList";
import SelectWinnerModal from "@/src/components/SelectWinnerModal";
import { saveMatch } from "@/src/db/queries/match_players";
import { createNewMatch } from "@/src/db/queries/matches";
import {
  addPlayers,
  checkForExistingPlayers,
  getPlayerIds,
} from "@/src/db/queries/players";
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
  const [playerNames, setPlayerNames] = useState<string[]>(
    Array(numPlayers).fill(""),
  );
  const [playerIds, setPlayerIds] = useState<number[]>(
    Array(numPlayers).fill(-1),
  );
  const [possibleReturningPlayers, setPossibleReturningPlayers] = useState<
    string[]
  >([]);
  const db = useSQLiteContext();
  const [matchId, setMatchId] = useState<number>(-1);
  const [pendingRolls, setPendingRolls] = useState<number[]>([]);

  // Update the new game button based on the number of players available
  useEffect(() => {
    // .every will search every name in players and check that it meets the condition
    setNewGameButtonActive(
      playerNames.every((player) => player && player.trim() !== ""),
    );
    setNumPlayers(playerNames.length);
  }, [playerNames]);

  const updatePlayersList = (playerNumber: number, newName: string) => {
    setPlayerNames((current) => {
      const updated = [...current];
      updated[playerNumber - 1] = newName;
      return updated;
    });
  };

  function changeNumPlayers(shouldIncrease: boolean) {
    if (shouldIncrease) {
      if (numPlayers < MAX_PLAYERS) {
        setPlayerNames((previousPlayers) => [...previousPlayers, ""]);
      }
    } else {
      if (numPlayers > MIN_PLAYERS) {
        setPlayerNames((players) => players.slice(0, -1));
      }
    }
  }

  function startGameClick() {
    if (numPlayers < MIN_PLAYERS || numPlayers > MAX_PLAYERS) {
      alert("Catan must have 3-6 players. Delete a player to continue.");
      return;
    }
    for (const player of playerNames) {
      if (!player || player.trim() === "") {
        alert("Name cannot be empty. Ensure all name fields have content.");
        return;
      }
    }

    // NOTE: async functions require using .then() syntax to access values returned from them,
    // because they are in Promise form otherwise
    checkForExistingPlayers(db, playerNames)
      .then((potentialReturningPlayers: string[]) => {
        if (potentialReturningPlayers.length > 0) {
          setPossibleReturningPlayers(potentialReturningPlayers);
          setShowNameConfirmModal(true);
        } else {
          startGame();
        }
      })
      .catch((error) => console.error(error));
  }

  const startGame = async () => {
    setShowNameConfirmModal(false);
    if (possibleReturningPlayers.length !== playerNames.length) {
      await addPlayers(
        db,
        playerNames.filter((name) => !possibleReturningPlayers.includes(name)),
      );
    }
    const ids = await getPlayerIds(db, playerNames);
    setPlayerIds(ids);
    setMatchId(await createNewMatch(db));
    setGameStarted(true);
  };

  const beginEndGameSequence = (
    showFinalModal: boolean,
    rollCounts: number[],
  ) => {
    setPendingRolls(rollCounts);
    setShowWinnerSelectionModal(showFinalModal);
  };

  const gameFinished = (winnerId: number) => {
    // TODO: save the game -- will want to have boolean state that will specify if there has been a new game pushed to the database.
    // This way, it doesn't require querying the database every single time the history tab is clicked, but only the first time the app
    // is loaded or when there is an update
    // Match created, players inserted; now we finished the game. So, who won? How will match_players be filled?
    // Answer: need to keep the match ID AND all player IDs
    setShowWinnerSelectionModal(false);
    setPendingRolls(pendingRolls.slice(0, 0));
    setNumPlayers(MIN_PLAYERS);
    setPlayerIds(Array(MIN_PLAYERS).fill(-1));
    setPlayerNames(Array(MIN_PLAYERS).fill(""));
    setGameStarted(false);

    saveMatch(db, matchId, playerIds, winnerId);
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
              <RollTrackerList finishGame={beginEndGameSequence} />
            </View>
          ) : (
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
          {showWinnerSelectionModal && (
            <View>
              <SelectWinnerModal
                finishGame={gameFinished}
                setShowModal={setShowWinnerSelectionModal}
                playerIds={playerIds}
                playerNames={playerNames}
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
