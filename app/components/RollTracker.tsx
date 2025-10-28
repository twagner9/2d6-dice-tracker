import Button from "@/app/components/Button";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  diceValue: number;
  totalRolls: number;
  updateTotalRollsState: (operation: string) => void;
};

export default function RollTracker({
  diceValue,
  totalRolls,
  updateTotalRollsState,
}: Props) {
  const [rollCount, setRollCounter] = useState(0);

  const decrementCount = () => {
    if (rollCount > 0) {
      updateTotalRollsState("dec");
      setRollCounter(rollCount - 1);
      totalRolls--;
    }
  };

  const incrementCount = () => {
    setRollCounter(rollCount + 1);
    totalRolls++;
    updateTotalRollsState("inc");
  };
  return (
    <View style={styles.rollCounterContainer}>
      <Text style={styles.labelText}>{diceValue}: </Text>
      <Button label="-" onPress={decrementCount} />
      <Text style={styles.pressText}>{rollCount}</Text>
      <Button label="+" onPress={incrementCount} />
      <Text style={[styles.pressText, { paddingLeft: 5 }]}>
        {(totalRolls > 0 ? (100 * (rollCount / totalRolls)).toFixed(2) : 0) +
          "%"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {},
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
  expectedProbabilityContainer: {},
});
