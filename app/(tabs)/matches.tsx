import { StyleSheet, Text, View } from 'react-native';

export default function MatchesScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Here is where the statistics for each individual game will go.</Text>
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