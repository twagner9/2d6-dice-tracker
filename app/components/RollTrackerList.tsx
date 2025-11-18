import Button from "@/app/components/Button";
import RollTracker from "@/app/components/RollTracker";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ConfirmClearModal from "./ConfirmClearModal";

export default function RollTrackerList() {
  const [rollCountValues, setRollCountValues] = useState<Array<number>>(
    new Array(11).fill(0)
  );
  const [percentageValues, setPercentageValues] = useState<Array<number>>(
    new Array(11).fill(0)
  );
  const [totalNumRolls, setTotalNumRolls] = useState<number>(0);
  const [showClearAllModal, setShowClearAllModal] = useState<boolean>(false);
  const [clearModalResponse, setClearModalResponse] = useState<boolean>(false);

  /**
   *
   * @param operation The operation that is specified by the button that was clicked.
   * @param id The ID of the RollTracker whose diceValue should be updated.
   */
  function updateRolls(operation: "inc" | "dec" | "clear", id: number) {
    if (operation === "clear") {
      setRollCountValues(rollCountValues.map(() => 0));
      // setTotalNumRolls(0);
      return;
    }

    // Bad ID; do nothing
    if (id === null) return;

    const updatedRolls = rollCountValues.map((v, i) =>
      i + 2 === id ? (operation === "inc" ? v + 1 : Math.max(0, v - 1)) : v
    );

    setRollCountValues(updatedRolls);
  }

  // Remember: useEffect is very useful when some state is dependent on another state;
  // it allows an update to the dependent state to be applied each time an update
  // occurs. And, since these updates are async, they will be completed only after
  // the independent state has finished updating

  // Update the total number of rolls each time an increment/decrement occurs
  useEffect(() => {
    setTotalNumRolls(rollCountValues.reduce((a, b) => a + b, 0));
  }, [rollCountValues]);

  // Update the percentages for each value each time the total number of rolls is updated
  useEffect(() => {
    setPercentageValues(
      rollCountValues.map((v) =>
        totalNumRolls === 0 ? 0 : (v / totalNumRolls) * 100
      )
    );
  }, [totalNumRolls]);

  function clearAllCurrentRolls() {
    // TODO: have an if conditional that checks the result of the modal before going through with the clear operation
    if (clearModalResponse === true) {
      updateRolls("clear", -1);
      setClearModalResponse(false);
    }
    setShowClearAllModal(false);
  }

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <View style={styles.diceTrackerContainer}>
        {rollCountValues.map((v, i) => (
          <RollTracker
            key={i}
            diceValue={i + 2}
            totalRolls={v}
            // percentage={percentageValues[i]}
            percentage={percentageValues[i].toFixed(2)}
            updateTotalRollsState={updateRolls}
          />
        ))}
        <View>
          <Text style={styles.totalText}>{"Rolls: " + totalNumRolls}</Text>
          <View style={styles.clearButtonContainer}>
            <Button
              label="Clear"
              onPress={() => setShowClearAllModal(true)}
              theme={"clear"}
            />
            <ConfirmClearModal
              isVisible={showClearAllModal}
              onResponse={setClearModalResponse}
            />
          </View>
        </View>
      </View>
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
    justifyContent: "center",
    alignItems: "stretch",
  },
  diceTrackerContainer: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
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
  clearButtonContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
