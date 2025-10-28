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
      <RollTrackerList
        totalDiceRolls={totalRolls}
        updateTotalRollsState={updateTotalRolls}
      />
      <Text style={[{ color: "#fff", fontSize: 40 }]}>{"test"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
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
