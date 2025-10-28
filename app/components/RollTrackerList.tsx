import RollTracker from "@/app/components/RollTracker";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  totalDiceRolls: number;
  updateTotalRollsState: (operation: string) => void;
};

export default function RollTrackerList({
  totalDiceRolls,
  updateTotalRollsState,
}: Props) {
  return (
    <View style={styles.fullTrackerContainer}>
      <View>
        <RollTracker
          diceValue={2}
          totalRolls={totalDiceRolls}
          updateTotalRollsState={updateTotalRollsState}
        ></RollTracker>
        <RollTracker
          diceValue={3}
          totalRolls={totalDiceRolls}
          updateTotalRollsState={updateTotalRollsState}
        ></RollTracker>
        <RollTracker
          diceValue={4}
          totalRolls={totalDiceRolls}
          updateTotalRollsState={updateTotalRollsState}
        ></RollTracker>
        <RollTracker
          diceValue={5}
          totalRolls={totalDiceRolls}
          updateTotalRollsState={updateTotalRollsState}
        ></RollTracker>
        <RollTracker
          diceValue={6}
          totalRolls={totalDiceRolls}
          updateTotalRollsState={updateTotalRollsState}
        ></RollTracker>
        <RollTracker
          diceValue={7}
          totalRolls={totalDiceRolls}
          updateTotalRollsState={updateTotalRollsState}
        ></RollTracker>
        <RollTracker
          diceValue={8}
          totalRolls={totalDiceRolls}
          updateTotalRollsState={updateTotalRollsState}
        ></RollTracker>
        <RollTracker
          diceValue={9}
          totalRolls={totalDiceRolls}
          updateTotalRollsState={updateTotalRollsState}
        ></RollTracker>
        <RollTracker
          diceValue={10}
          totalRolls={totalDiceRolls}
          updateTotalRollsState={updateTotalRollsState}
        ></RollTracker>
        <RollTracker
          diceValue={11}
          totalRolls={totalDiceRolls}
          updateTotalRollsState={updateTotalRollsState}
        ></RollTracker>
        <RollTracker
          diceValue={12}
          totalRolls={totalDiceRolls}
          updateTotalRollsState={updateTotalRollsState}
        ></RollTracker>
        <View>
          <Text style={styles.totalText}>{"Rolls: " + totalDiceRolls}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullTrackerContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#25292e",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  diceTrackerContainer: {
    flex: 1,
    backgroundColor: "#25292e",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  totalText: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e",
    flex: 1,
    fontSize: 40,
    color: "#fff",
  },
});
