import HistoryRecord from "@/src/components/HistoryRecord";
import { StyleSheet, Text, View } from "react-native";

/**
 * This tab needs to have a few things going on now that we're storing previous games:
 * Need a plan for laying out display of a specific match; only one at a time? scroll view
 * that will display however many games the user wants to display?
 *
 * Data to be displayed: match ID, date played, players present, winner, and the global roll stats
 * Create separate boxes for each match
 */

export default function MatchesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Here is where the statistics for each individual game will go.
      </Text>
      {/* TODO: Make this spawn based on the total number of matches stored from the database */}
      <HistoryRecord
        matchId={1}
        date={new Date()}
        players={["John", "Sarah", "Michael"]}
        winner={"John"}
        rolls={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
      />
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
});
