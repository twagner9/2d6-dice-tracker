import { StyleSheet, Text, View } from "react-native";

export default function HistoryRecord(props: {
  matchId: number;
  date: Date;
  players: string[];
  winner: string;
  rolls: number[];
}) {
  return (
    <>
      <View style={styles.recordView}>
        <View style={styles.genInfoView}>
          <Text
            style={styles.recordText}
          >{`Match ID: ${props.matchId.toString()}`}</Text>
          <Text
            style={styles.dateText}
          >{`Date: ${props.date.toLocaleString()}`}</Text>
        </View>
        <View style={styles.playersView}>
          <Text style={styles.recordText}>{"Players:"}</Text>
          <View style={styles.playersGrid}>
            {props.players.map((str: string, index: number) => (
              <Text style={styles.playersText} key={index}>
                {str}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.winnerView}>
          <Text style={styles.recordText}>{`Winner: ${props.winner}`}</Text>
        </View>
        <View style={styles.rollsView}>
          <Text style={styles.recordText}>{"Rolls:\t"}</Text>
          <View style={styles.rollsColumn}>
            {props.rolls.slice(0, 4).map((count: number, rollValue: number) => (
              <Text style={styles.recordText} key={rollValue}>
                {rollValue + 2}: {count}
              </Text>
            ))}
          </View>
          <View style={styles.rollsColumn}>
            {props.rolls.slice(4, 8).map((count: number, rollValue: number) => (
              <Text style={styles.recordText} key={rollValue}>
                {rollValue + 6}: {count}
              </Text>
            ))}
          </View>
          <View style={styles.rollsColumn}>
            {props.rolls
              .slice(8, 11)
              .map((count: number, rollValue: number) => (
                <Text style={styles.recordText} key={rollValue}>
                  {rollValue + 10}: {count}
                </Text>
              ))}
          </View>
        </View>
      </View>
    </>
  );
}

// TODO: Why are the rolls columns expanding above the Rolls: text?
// How do I top align the content in each column?
const styles = StyleSheet.create({
  recordView: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    marginTop: 10,
    width: "85%",
    alignSelf: "center",
  },
  genInfoView: { flexDirection: "row", alignItems: "center" },
  playersView: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
  },
  playersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
  playersText: {
    width: "33.33%",
    color: "#fff",
    padding: 5,
  },
  dateText: {
    textAlign: "right",
    color: "#fff",
    padding: 5,
  },
  winnerView: {},
  rollsView: { flexDirection: "row", alignItems: "flex-start" },
  rollsColumn: { flex: 1 },
  recordText: {
    color: "#fff",
    padding: 5,
  },
});
