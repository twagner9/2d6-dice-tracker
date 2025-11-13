import Button from "@/app/components/Button";
import RollTracker from "@/app/components/RollTracker";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
  function updateRolls(operation: "inc" | "dec" | "clear", id: number) {
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
        i + 2 === id ? (operation === "inc" ? v + 1 : Math.max(0, v - 1)) : v
      )
    );

    // Update the total number of rolls
    setTotalNumRolls(rollCountValues.reduce((a, b) => a + b, 0));

    // TODO: update this accordingly after changing the setRollCountValues method
    // Finally, calculate the updated percentage for each value after the update
    const updatedPercentages = rollCountValues.map((v) =>
      totalNumRolls === 0 ? 0 : (v / totalNumRolls) * 100
    );
    setPercentageValues(updatedPercentages);
  }

  function clearAllCurrentRolls() {
    updateRolls("clear", -1);
  }

  // console.log(
  //   "rollCountValues length: ",
  //   rollCountValues.length,
  //   rollCountValues
  // );
  // console.log(
  //   "percentageValues length: ",
  //   percentageValues.length,
  //   percentageValues
  // );

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.diceTrackerContainer}>
          {rollCountValues.map((v, i) => (
            <RollTracker
              key={i}
              diceValue={i + 2}
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
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  scrollContent: {
    flex: 1,
    flexDirection: "column",
    padding: 12,
    textAlign: "center",
    justifyContent: "space-evenly",
  },
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
    flexDirection: "column",
    backgroundColor: "#25292e",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "stretch",
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
