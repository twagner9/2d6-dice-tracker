import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ProbabilitiesTable() {
  return (
    <ScrollView contentContainerStyle={styles.expectedProbabilitiesContainer}>
      <Text style={styles.approximateHeading}>
        {"Approximate Probability Percentages"}
      </Text>
      <View style={styles.columnGrouping}>
        <Text style={styles.expectedValuesText}>{"2 ~ 2.77  %"}</Text>
        <Text style={styles.expectedValuesText}>{"3 ~ 5.55  %"}</Text>
        <Text style={styles.expectedValuesText}>{"4 ~ 8.33  %"}</Text>
        <Text style={styles.expectedValuesText}>{"5 ~ 11.11 %"}</Text>
      </View>
      <View style={styles.columnGrouping}>
        <Text style={styles.expectedValuesText}>{"6 ~ 13.88 %"}</Text>
        <Text style={styles.expectedValuesText}>{"7 ~ 16.66 %"}</Text>
        <Text style={styles.expectedValuesText}>{"8 ~ 13.88 %"}</Text>
        <Text style={styles.expectedValuesText}>{"9 ~ 11.11 %"}</Text>
      </View>
      <View style={styles.columnGrouping}>
        <Text style={styles.expectedValuesText}>{"10 ~ 8.33 %"}</Text>
        <Text style={styles.expectedValuesText}>{"11 ~ 5.55 %"}</Text>
        <Text style={styles.expectedValuesText}>{"12 ~ 2.77 %"}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  columnGrouping: {
    width: "33.33%",
    flexDirection: "column",
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
