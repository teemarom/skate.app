import { StyleSheet, Text, View } from "react-native";

export function Tricks() {
    return (
        <View style={styles.container}>
            <Text>Temput tulee tänne</Text>
        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});