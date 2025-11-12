import Button from "@/app/components/Button";
import RollTracker from "@/app/components/RollTracker";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function RollTrackerList() {
  const [rollCountValues, setRollCountValues] = useState<Array<number>>(
    new Array(11).fill(0)
  );
  const [percentageValues, setPercentageValues] = useState<Array<number>>(
    new Array(11).fill(0)
  );
  const [totalNumRolls, setTotalNumRolls] = useState<number>(0);

  /**
   *
   * @param operation The operation that is specified by the button that was clicked.
   * @param id The ID of the RollTracker whose diceValue should be updated.
   */
  function updateRolls(operation: string, id: number) {
    if (operation === "clear") {
      setRollCountValues(rollCountValues.map(() => 0));
      setTotalNumRolls(0);
      return;
    }

    // Bad ID; do nothing
    if (id === null) return;

    // Update the number of rolls based on the existing array using the RollTracker's
    // id, which in this case, will be its diceValue. Also, if during the loop the current
    // ID doesn't match the specified, keep the value the same
    // TODO: I can improve this because it's based on the dice value; I do not need to loop,
    // I can go directly to the correct element.
    setRollCountValues((prev) =>
      prev.map((v, i) =>
        i === id ? (operation === "inc" ? v + 1 : Math.max(0, v - 1)) : v
      )
    );

    // Finally, update the total number of rolls
    setTotalNumRolls(rollCountValues.reduce((a, b) => a + b, 0));

    // TODO: update this accordingly after changing the setRollCountValues method
    setPercentageValues((prev) =>
      prev.map((p, i) =>
        i === id ? (p > 0 ? rollCountValues[i] / totalNumRolls : 0) : p
      )
    );
  }

  function clearAllCurrentRolls() {
    updateRolls("clear", -1);
  }

  return (
    <View style={styles.fullTrackerContainer}>
      <View>
        {rollCountValues.map((v, i) => (
          <RollTracker
            key={i}
            diceValue={i}
            totalRolls={v}
            percentage={percentageValues[i]}
            updateTotalRollsState={updateRolls}
          />
        ))}
        <View>
          <Text style={styles.totalText}>{"Rolls: " + totalNumRolls}</Text>
          <Button label="Clear" onPress={clearAllCurrentRolls}></Button>
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
    justifyContent: "space-evenly",
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
    fontSize: 25,
    color: "#fff",
  },
  clearButton: {},
});
