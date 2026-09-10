import HistoryRecord from "@/src/components/HistoryRecord";
import { ScrollView, StyleSheet, Text, View } from "react-native";

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
      <View style={styles.headingText}>
        <Text style={styles.matchHistoryText}>{"Match History"}</Text>
      </View>
      {/* TODO: Make this spawn based on the total number of matches stored from the database */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.matchScroller}
      >
        <HistoryRecord
          matchId={1}
          date={new Date()}
          players={["John", "Sarah", "Michael", "Olivia", "Joshua", "Emilio"]}
          winner={"John"}
          rolls={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
        />
        <HistoryRecord
          matchId={1}
          date={new Date()}
          players={["John", "Sarah", "Michael", "Olivia", "Joshua", "Emilio"]}
          winner={"John"}
          rolls={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
        />
        <HistoryRecord
          matchId={1}
          date={new Date()}
          players={["John", "Sarah", "Michael", "Olivia", "Joshua", "Emilio"]}
          winner={"John"}
          rolls={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
        />
        <HistoryRecord
          matchId={1}
          date={new Date()}
          players={["John", "Sarah", "Michael", "Olivia", "Joshua", "Emilio"]}
          winner={"John"}
          rolls={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    textAlign: "center",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    textDecorationStyle: "solid",
    color: "#fff",
  },
  headingText: { padding: 20 },
  matchHistoryText: {
    color: "#fff",
    fontSize: 20,
  },
  // TODO: make put padding between its children
  matchScroller: {
    width: "100%",
  },
});
