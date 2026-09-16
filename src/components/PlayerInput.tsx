import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type PlayerProps = {
  playerNumber: number;
};

export default function PlayerInput({
  playerNumber,
  onNameChange,
}: {
  playerNumber: number;
  onNameChange: (playerNumber: number, newName: string) => void;
}) {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    onNameChange(playerNumber, name);
  }, [name]);

  /**
   * There can be a variable number of the players. This means I have to consider how to handle getting this component
   * to render the proper number. It should always start with 3, and there should be a button that will allow adding
   * up to 6 players, and removing down to 3.
   *
   * 1. How to track the number of players?
   * 2. How to style the add/remove buttons
   * 3. Proper construction of label and input.
   * 4. How the update of each player in the array should take place -- with keystrokes, or with a save button.
   */
  return (
    <View style={style.labelAndInputArea}>
      <View style={style.playerView}>
        <Text style={style.playerLabel}>{`Player ${playerNumber}:`}</Text>
        <TextInput onChangeText={setName} style={style.playerInput}></TextInput>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  labelAndInputArea: {
    paddingBottom: 15,
  },
  playerView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  playerLabel: {
    color: "white",
    fontSize: 20,
    marginRight: 20,
  },
  playerInput: {
    borderColor: "#bcf5f5",
    borderWidth: 2,
    backgroundColor: "#fff",
    width: "auto",
    flex: 1,
    color: "black",
    fontSize: 18,
  },
});
