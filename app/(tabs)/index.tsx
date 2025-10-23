import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This will either be changed to be the summary screen, or it will be used as the "start a new game" page.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        textDecorationStyle: 'solid',
        color: '#fff',
    }
});
