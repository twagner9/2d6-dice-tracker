import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "./Button";
import PlayerInput from "./PlayerInput";

export default function PlayersScreen({
  updatePlayers,
  changeNumPlayers,
  numPlayers,
}: {
  updatePlayers: (playerNumber: number, newName: string) => void;
  changeNumPlayers: (shouldIncrease: boolean) => void;
  numPlayers: number;
}) {
  const [removeEnabled, setRemoveEnabled] = useState<boolean>(false);
  const [addEnabled, setAddEnabled] = useState<boolean>(true);

  const MAX_PLAYERS = 6;
  const MIN_PLAYERS = 3;

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

  const updatePlayerName = (playerNumber: number, newName: string) => {
    updatePlayers(playerNumber, newName);
  };

  return (
    <View style={styles.playersScreenView}>
      {Array.from({ length: numPlayers }, (_, index) => {
        return (
          <PlayerInput
            key={index}
            playerNumber={index + 1}
            onNameChange={updatePlayerName}
          />
        );
      })}
      <View style={styles.addOrRemoveView}>
        <Button
          label={"Remove"}
          onPress={() => changeNumPlayers(false)}
          enabled={removeEnabled}
          containerStyle={styles.addOrRemoveButtonView}
          buttonStyle={styles.addOrRemoveButton}
          labelStyle={styles.addOrRemoveButtonLabel}
        />
        <Button
          label={"Add"}
          onPress={() => changeNumPlayers(true)}
          enabled={addEnabled}
          containerStyle={styles.addOrRemoveButtonView}
          buttonStyle={styles.addOrRemoveButton}
          labelStyle={styles.addOrRemoveButtonLabel}
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
  addOrRemoveButtonView: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  addOrRemoveButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
  },
  addOrRemoveButtonLabel: {
    fontSize: 20,
  },
});
