import Button from "@/app/components/Button";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  diceValue: number;
};

export default function RollTracker({ diceValue }: Props) {
  const [rollCount, setRollCounter] = useState(0);

  const decrementCount = () => {
    setRollCounter(Math.max(0, rollCount - 1));
  };

  const incrementCount = () => {
    setRollCounter(rollCount + 1);
  };
  return (
    <View style={styles.rollCounterContainer}>
      <Text style={styles.labelText}>{diceValue}: </Text>
      <Button label="-" onPress={decrementCount} />
      <Text style={styles.pressText}>{rollCount}</Text>
      <Button label="+" onPress={incrementCount} />
    </View>
  );
}

const styles = StyleSheet.create({
  rollCounterContainer: {
    flex: 1,
    flexDirection: "row",
  },
  labelText: {
    textAlign: "right",
    width: 40,
    fontSize: 20,
    textDecorationStyle: "solid",
    color: "#fff",
  },
  pressText: {
    fontSize: 20,
    textDecorationStyle: "solid",
    color: "#fff",
    padding: 3,
  },
});
