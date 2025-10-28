import RollTrackerList from "@/app/components/RollTrackerList";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [totalRolls, setTotalRolls] = useState<number>(0);

  const updateTotalRolls = (operation: string) => {
    if (operation === "inc") setTotalRolls(totalRolls + 1);
    else if (operation === "dec") setTotalRolls(Math.max(totalRolls - 1, 0));
  };
  return (
    <View style={styles.container}>
      <View>
        <RollTrackerList
          totalDiceRolls={totalRolls}
          updateTotalRollsState={updateTotalRolls}
        />
      </View>
      <View style={styles.expectedProbabilitiesContainer}>
        <Text style={styles.approximateHeading}>
          {"Approximate expected roll percentages:"}
        </Text>
        <Text style={styles.expectedValuesText}>{"2 ~ 2.77  %"}</Text>
        <Text style={styles.expectedValuesText}>{"3 ~ 5.55  %"}</Text>
        <Text style={styles.expectedValuesText}>{"4 ~ 8.33  %"}</Text>
        <Text style={styles.expectedValuesText}>{"5 ~ 11.11 %"}</Text>
        <Text style={styles.expectedValuesText}>{"6 ~ 13.88 %"}</Text>
        <Text style={styles.expectedValuesText}>{"7 ~ 16.66 %"}</Text>
        <Text style={styles.expectedValuesText}>{"8 ~ 13.88 %"}</Text>
        <Text style={styles.expectedValuesText}>{"9 ~ 11.11 %"}</Text>
        <Text style={styles.expectedValuesText}>{"10 ~ 8.33 %"}</Text>
        <Text style={styles.expectedValuesText}>{"11 ~ 5.55 %"}</Text>
        <Text style={styles.expectedValuesText}>{"12 ~ 2.77 %"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#25292e",
    textAlign: "center",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    textDecorationStyle: "solid",
    color: "#fff",
  },
  diceTrackerContainer: {},
  expectedProbabilitiesContainer: {
    justifyContent: "space-evenly",
  },
  expectedValuesText: {
    color: "#fff",
    fontSize: 22,
    textAlign: "center",
    justifyContent: "center",
  },
  approximateHeading: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
});
