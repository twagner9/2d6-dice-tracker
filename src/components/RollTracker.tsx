import Button from "@/src/components/Button";
import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  diceValue: number;
  totalRolls: number;
  percentage: string;
  updateTotalRollsState: (
    operation: "inc" | "dec" | "clear",
    id: number,
  ) => void;
};

const RollTracker = memo(function RollTracker({
  diceValue,
  totalRolls,
  percentage,
  updateTotalRollsState,
}: Props) {
  const decrementCount = () => {
    if (totalRolls > 0) {
      updateTotalRollsState("dec", diceValue);
    }
  };

  const incrementCount = () => {
    updateTotalRollsState("inc", diceValue);
  };
  return (
    <View style={styles.rollCounterContainer}>
      <Text style={styles.labelText}>{diceValue}: </Text>
      <Button
        label="-"
        onPress={decrementCount}
        enabled={true}
        containerStyle={styles.incrementDecrementButtonsView}
        buttonStyle={styles.incrementDecrementButtons}
        slopValue={12}
      />
      <Text style={styles.pressText}>{totalRolls}</Text>
      <Button
        label="+"
        onPress={incrementCount}
        enabled={true}
        containerStyle={styles.incrementDecrementButtonsView}
        buttonStyle={styles.incrementDecrementButtons}
        slopValue={12}
      />
      <Text style={[styles.percentageText, { paddingLeft: 5 }]}>
        {percentage + "%"}
      </Text>
    </View>
  );
});

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
    padding: 1,
    textAlign: "center",
    minWidth: 30,
  },
  percentageText: {
    fontSize: 20,
    textDecorationStyle: "solid",
    color: "#fff",
    padding: 1,
    textAlign: "right",
    minWidth: 85,
  },
  incrementDecrementButtonsView: { marginBottom: 12 },
  incrementDecrementButtons: { width: 30, height: 25 },
});

export default RollTracker;
