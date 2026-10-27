import { View, Text, StyleSheet } from "react-native";
import { Trick } from "../types/Trick";

type Props = {
    trick: Trick;
};

export function TrickItem({ trick }: Props) {
    return (
        <View style={styles.item}>
            <Text style={styles.name}>{trick.trickName}</Text>
            <Text style={styles.description}>{trick.description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        
    },
    name: {
        fontWeight: "bold",
        fontSize: 18,
    },
    description: {
        fontSize: 16
    }
});