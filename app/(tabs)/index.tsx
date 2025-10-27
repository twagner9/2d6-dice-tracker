import RollTracker from "@/app/components/RollTracker";
import { StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.diceTrackerContainer}>
        <RollTracker diceValue={2}></RollTracker>
        <RollTracker diceValue={3}></RollTracker>
        <RollTracker diceValue={4}></RollTracker>
        <RollTracker diceValue={5}></RollTracker>
        <RollTracker diceValue={6}></RollTracker>
        <RollTracker diceValue={7}></RollTracker>
        <RollTracker diceValue={8}></RollTracker>
        <RollTracker diceValue={9}></RollTracker>
        <RollTracker diceValue={10}></RollTracker>
        <RollTracker diceValue={11}></RollTracker>
        <RollTracker diceValue={12}></RollTracker>
      </View>
    </View>
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
  diceTrackerContainer: {},
});
