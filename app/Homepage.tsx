import { Image, StyleSheet, Text, View } from "react-native";


export default function Homepage() {
    return (
        <View style={styles.container}>
            <Image
                style={{ width: 330, height: 280 }}
                source={{ uri: "https://cdn.pixabay.com/photo/2024/01/17/21/20/pug-8515766_640.png" }}
            />
            <Text style={styles.title}>Welcome to Skate.app!</Text>

            <Text style={styles.description}>
                Track your skateboarding progress and keep track of the tricks
                you're practicing and the ones you've already landed.
            </Text>
            <Text style={styles.description}>
                From Map tab you can find skateparks near Helsinki area.
            </Text>

            <Text style={styles.hint}>
                Start by adding your dream trick! Once you have landed it, 
                hold its checkbox to move it to the landed list.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',

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