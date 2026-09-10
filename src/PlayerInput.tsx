import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function PlayerInput() {
  const [name, setName] = useState<string>("");

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
      <Text>{"Player 1:"}</Text>
      <TextInput></TextInput>
    </View>
  );
}

const style = StyleSheet.create({
  labelAndInputArea: {},
});
