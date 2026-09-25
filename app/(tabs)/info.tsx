import ProbabilitiesTable from "@/src/components/ProbabilitiesTable";
import { StyleSheet, View } from "react-native";

export default function SummaryScreen() {
  return (
    <>
      <View style={styles.container}>
        <ProbabilitiesTable />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    textDecorationStyle: "solid",
    color: "#fff",
  },
});
