import Button from "@/src/components/Button";
import ConfirmClearModal from "@/src/components/ConfirmClearModal";
import RollTracker from "@/src/components/RollTracker";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RollTrackerList({
  finishGame,
}: {
  finishGame: (showFinalModal: boolean, rollCounts: number[]) => void;
}) {
  const [rollCountValues, setRollCountValues] = useState<Array<number>>(
    new Array(11).fill(0),
  );
  const [percentageValues, setPercentageValues] = useState<Array<number>>(
    new Array(11).fill(0),
  );
  const [totalNumRolls, setTotalNumRolls] = useState<number>(0);
  const [showClearAllModal, setShowClearAllModal] = useState<boolean>(false);

  /**
   *
   * @param operation The operation that is specified by the button that was clicked.
   * @param id The ID of the RollTracker whose diceValue should be updated.
   *
   * NOTE: Memoizing requires that all props must be reference-stable (i.e., always refer to the
   * same object) across renders, otherwise it saves nothing. Adding this useCallback with an
   * empty dependency array prevents the function from changing, ensuring that each render will
   * always use the original state array when updating, rather than using the original state
   * of the state array (which was [0,0,0...]).
   */
  const updateRolls = useCallback(
    (operation: "inc" | "dec" | "clear", id: number) => {
      if (operation === "clear") {
        setRollCountValues((prev) => prev.map(() => 0));
        // setTotalNumRolls(0);
        return;
      }

      // Bad ID; do nothing
      if (id === null) return;

      setRollCountValues((prev) =>
        prev.map((v, i) =>
          i + 2 === id ? (operation === "inc" ? v + 1 : Math.max(0, v - 1)) : v,
        ),
      );
    },
    [],
  );

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
        totalNumRolls === 0 ? 0 : (v / totalNumRolls) * 100,
      ),
    );
  }, [totalNumRolls]);

  function clearAllCurrentRolls(response: boolean) {
    // TODO: have an if conditional that checks the result of the modal before going through with the clear operation
    if (response === true) {
      updateRolls("clear", -1);
      setShowClearAllModal(false);
    }
    setShowClearAllModal(false);
  }

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <View style={styles.diceTrackerContainer}>
        {rollCountValues.map((v, i) => (
          <Animated.View
            key={i}
            entering={FadeInDown.duration(300).delay(i * 30)}
          >
            <RollTracker
              key={i}
              diceValue={i + 2}
              totalRolls={v}
              // percentage={percentageValues[i]}
              percentage={percentageValues[i].toFixed(2)}
              updateTotalRollsState={updateRolls}
            />
          </Animated.View>
        ))}
        <View>
          <Text style={styles.totalText}>{"Rolls: " + totalNumRolls}</Text>
          <View style={styles.clearButtonView}>
            <Button
              label="Clear"
              onPress={() => setShowClearAllModal(true)}
              slopValue={20}
              enabled={true}
              containerStyle={styles.clearButtonContainer}
              buttonStyle={styles.clearButton}
              labelStyle={styles.clearButtonLabel}
            />
            <ConfirmClearModal
              isVisible={showClearAllModal}
              onResponse={clearAllCurrentRolls}
            />
            <Button
              label="Finish Game"
              onPress={() => finishGame(true, rollCountValues)}
              enabled={true}
              containerStyle={styles.finishButtonContainer}
              buttonStyle={styles.finishButton}
              labelStyle={styles.finishLabel}
              slopValue={20}
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
  clearButtonView: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  // ------------------ FOR BUTTON COMPONENT STYLING -------------------------------
  clearButtonContainer: {
    // width: 80,
    // height: 30,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  clearButton: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 30,
  },
  clearButtonLabel: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 20,
  },
  finishButtonContainer: { marginTop: 15 },
  finishButton: {
    width: 120,
    height: 30,
  },
  finishLabel: {
    fontSize: 20,
  },
  // ------------------ FOR BUTTON COMPONENT STYLING -------------------------------
});
