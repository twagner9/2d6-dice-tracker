import RollTrackerList from "@/src/components/RollTrackerList";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Index() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  function newGameClick() {
    // TODO: execute the logic for creating a new match

    setGameStarted(true);
  }
  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.diceTrackerContainer}>
          <RollTrackerList />
        </View>
        <View style={styles.expectedProbabilitiesContainer}>
          <Text style={styles.approximateHeading}>
            {"Approximate Probability Percentages"}
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
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
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
  diceTrackerContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
    borderRadius: 2,
  },
  expectedProbabilitiesContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderColor: "#fff",
    borderStyle: "solid",
    borderWidth: 3,
    paddingTop: 4,
    borderRadius: 10,
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
