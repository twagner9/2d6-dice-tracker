import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import PlayerInput from "../PlayerInput";
import Button from "./Button";

export default function PlayersScreen() {
  const MIN_PLAYERS = 3;
  const MAX_PLAYERS = 6;
  const [numPlayers, setNumPlayers] = useState<number>(MIN_PLAYERS);
  const [removeEnabled, setRemoveEnabled] = useState<boolean>(false);
  const [addEnabled, setAddEnabled] = useState<boolean>(true);

  useEffect(() => {
    if (numPlayers >= MAX_PLAYERS) {
      setAddEnabled(false);
    } else if (numPlayers <= MIN_PLAYERS) {
      setRemoveEnabled(false);
    } else {
      setAddEnabled(true);
      setRemoveEnabled(true);
    }
  }, [numPlayers]);

  function addPlayer() {
    setNumPlayers(numPlayers + 1);
  }

  function removePlayer() {
    setNumPlayers(numPlayers - 1);
  }

  // TODO: add a check for the contents of each input area to verify that each player name has been filled in
  // Right now, it's probably easiest to manually check each PlayerInput and if they all have content, load them into the players,
  // which is state that should be passed from index.tsx when rendering the component. Then, it can start to handle the backend logic
  // of either using an existing player or creating a new player.
  // The goal is ultimately to avoid having a "save" button that must be pressed, instead opting to have it automatically detect
  // that all inputs are valid before enabling the Start Game button.

  return (
    <View style={styles.playersScreenView}>
      {Array.from({ length: numPlayers }, (_, index) => {
        return <PlayerInput key={index} playerNumber={index + 1} />;
      })}
      <View style={styles.addOrRemoveView}>
        <Button
          label={"Remove"}
          onPress={removePlayer}
          enabled={removeEnabled}
          theme={"addOrRemove"}
        />
        <Button
          label={"Add"}
          onPress={addPlayer}
          enabled={addEnabled}
          theme={"addOrRemove"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  playersScreenView: {
    marginBottom: 25,
  },
  addOrRemoveView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
});
