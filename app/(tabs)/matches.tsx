import HistoryRecord from "@/src/components/HistoryRecord";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

/**
 * Plan:
 * -Display numberOfRecords HistoryRecord components filled in with data from the database.
 * -If there are more matches present in the database than fit on the page, then 2 buttons
 * should be at the bottom of the page, <- and ->, indicating that the user load different
 * pages of data.
 * 	-Each time one is clicked, it should query the database to pull that data and load it for the user, in the proper order.
 *  -Will likely opt for sorting by ID, since the AUTOINCREMENT used for match_id means that this
 *  also represents how recent the game was relative to other games.
 * -Add an option for sorting by newest/oldest, perhaps also with a date search.
 *
 */

export default function MatchesScreen() {
  const [numberOfRecords, setNumberOfRecords] = useState<number>(5);
  const [order, setOrder] = useState<string>("Most recent");

  const numRecordsOptions = ["3", "5", "10", "15", "20"];
  const sortOptions = ["Oldest", "Most recent"];

  /**
   * Each update to the number of records, which should come from a SelectDropdown, requires pulling fresh data
   * from the database to fill the appropriate number of records.
   */
  useEffect(() => {
    // TODO: each time this updated, the database should be re-queried to pull the appropriate number of records
  }, [numberOfRecords]);

  /**
   * Each update to the order must also cause a fresh DB query.
   */
  useEffect(() => {
    // TODO: call the same function used by the hook for the number of records
  }, [order]);

  return (
    <View style={styles.container}>
      <View style={styles.headingText}>
        <Text style={styles.matchHistoryText}>{"Match History"}</Text>
        <SelectDropdown
          data={numRecordsOptions}
          onSelect={(selectedNumber: number) =>
            setNumberOfRecords(selectedNumber)
          }
          renderButton={/*TODO*/}
          renderItem={/*TODO*/}
        />
        <SelectDropdown
          data={sortOptions}
          onSelect={(selectedOrder: string) => setOrder(selectedOrder)}
          renderButton={/*TODO*/}
          renderItem={/*TODO*/}
        />
      </View>
      {/* TODO: Make this spawn based on the total number of matches stored from the database */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.matchScroller}
      >
        {}
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
    fontSize: 24,
  },
  // TODO: make put padding between its children
  matchScroller: {
    width: "100%",
  },
});
