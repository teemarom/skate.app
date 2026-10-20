import { StyleSheet, Text, View } from "react-native";


export default function Homepage() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Skate.app!🛹</Text>

            <Text style={styles.description}>
               Track your skateboarding progress and keep track of the tricks
               you're practicing and the ones you've already landed. From Map tab 
               you can find skateparks near Helsinki area.
            </Text>

            <Text style={styles.hint}>
                Start by adding your first trick!
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        
    }, title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        lineHeight: 24,
        color: "#666",
        marginBottom: 20,
    },
    hint: {
        fontSize: 15,
        fontWeight: "600",
        textAlign: "center",
        color: "#222",
    },
});