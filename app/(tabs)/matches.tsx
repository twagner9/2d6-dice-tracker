import { useAppContext } from "@/context/AppContext";
import HistoryRecord from "@/src/components/HistoryRecord";
import { getRecentMatches } from "@/src/db/queries/matches";
import { FontAwesome } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

export type RecentMatchesResult = {
  id: number;
  date: string;
  players: { playerId: number; name: string; winner: boolean }[];
  rolls: { rollValue: string; count: number }[];
};

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
  const [numberOfRecords, setNumberOfRecords] = useState<number>(3);
  const [order, setOrder] = useState<string>("Most recent");
  const [matchData, setMatchData] = useState<RecentMatchesResult[]>([]);
  const { refreshHistoryData, setRefreshHistoryData } = useAppContext();

  const numRecordsOptions = ["3", "5", "10", "15", "20"];
  const sortOptions = ["Oldest", "Most recent"];

  const db = useSQLiteContext();
  /**
   * Each update to the number of records, which should come from a SelectDropdown, requires pulling fresh data
   * from the database to fill the appropriate number of records.
   */
  useEffect(() => {
    if (!db) return;
    loadQueryData();
  }, [numberOfRecords]);

  /**
   * Each update to the order must also cause a fresh DB query.
   */
  useEffect(() => {
    if (!db) return;
    loadQueryData();
  }, [order]);

  useEffect(() => {
    if (refreshHistoryData) {
      if (!db) return;
      loadQueryData();
      setRefreshHistoryData(false);
    }
  }, [refreshHistoryData]);

  /**
   * Calls database function for retrieving data and then unpacks the data before utilizing it to load into the list of HistoryRecord objects
   */
  async function loadQueryData() {
    if (!db) return;
    try {
      setMatchData(await getRecentMatches(db, numberOfRecords, order));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingText}>
        <Text style={styles.matchHistoryText}>{"Match History"}</Text>
      </View>
      <View style={styles.selectionsView}>
        <View style={styles.dropdownView}>
          <SelectDropdown
            data={numRecordsOptions}
            onSelect={(selectedNumber: string) =>
              setNumberOfRecords(parseInt(selectedNumber))
            }
            defaultValue={numRecordsOptions[0]}
            renderButton={(selectedNumber, isOpened) => {
              return (
                <View
                  style={{ ...styles.dropdownButtonStyle, ...{ width: 80 } }}
                >
                  {
                    <Text style={styles.dropdownNameText}>
                      {selectedNumber}
                    </Text>
                  }
                  <FontAwesome
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    size={16}
                    color={"#fff"}
                    style={{}}
                  />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && { backgroundColor: "#47576c" }),
                  }}
                >
                  <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                </View>
              );
            }}
          />
        </View>
        <View style={styles.dropdownView}>
          <SelectDropdown
            data={sortOptions}
            onSelect={(selectedOrder: string) => setOrder(selectedOrder)}
            defaultValue={sortOptions[1]}
            renderButton={(selectedOrder, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  {<Text style={styles.dropdownNameText}>{selectedOrder}</Text>}
                  <FontAwesome
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    size={16}
                    color={"#fff"}
                    style={{}}
                  />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && { backgroundColor: "#47576c" }),
                  }}
                >
                  <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                </View>
              );
            }}
          />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.matchScroller}
      >
        {matchData.map((match) => {
          return (
            <HistoryRecord
              key={match.id}
              matchId={match.id}
              date={match.date}
              players={match.players.map((p) => p.name)}
              rolls={match.rolls.map((r) => r.count)}
              winner={
                match.players.find((player) => player.winner)?.name ??
                "No winner"
              }
            />
          );
        })}
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

  matchScroller: {
    width: "100%",
  },

  selectionsView: {
    width: "85%",
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dropdownView: {
    borderRadius: 8,
    borderWidth: 3,
    borderColor: "#ffd33d",
    backgroundColor: "#7590b32e",
    justifyContent: "space-between",
  },
  dropdownNameText: {
    color: "#fff",
    fontSize: 22,
    flex: 1,
  },
  dropdownButtonStyle: {
    width: 160,
    height: 50,
    backgroundColor: "#7590b32e",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  dropdownButtonTextStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: "#293341",
  },
  dropdownItemTxtStyle: {
    color: "#fff",
    fontSize: 18,
  },
});
