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
          <Text>{`Match ID: ${props.matchId.toString()}`}</Text>
          <Text>{`Date: ${props.date.toString()}`}</Text>
        </View>
        <View style={styles.playersView}>
          <Text>{"Players:"}</Text>
        </View>
        <View style={styles.winnerView}>
          <Text>{`Winner: ${props.winner}`}</Text>
        </View>
        <View style={styles.rollsView}>
          <Text>{"Rolls:"}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  recordView: {},
  genInfoView: {},
  playersView: {},
  winnerView: {},
  rollsView: {},
});
