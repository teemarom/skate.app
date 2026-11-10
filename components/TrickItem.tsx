import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { Trick } from "../types/Trick";
import * as Haptics from "expo-haptics";


type Props = {
    trick: Trick;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;

};

export function TrickItem({ trick, onToggle, onDelete }: Props) {
    const landed = trick.status === "Landed";
    const title = landed ? "Move back to In Progress?" : "Trick landed?";
    const confirmText = landed ? "Move back" : "Landed";

    return (
        <View style={styles.item}>

            <View style={styles.texts}>
                <Text style={[styles.name, landed && styles.nameLanded]}>
                    {trick.trickName}
                </Text>
                <Text>{trick.description}</Text>
            </View>
            
            <Pressable
                onPress={() => {
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
                    Alert.alert(title,
                        `${trick.trickName}\n${trick.description}`, [
                            {text: "Cancel", style: "cancel"},
                            {text: confirmText, onPress: () =>  {
                                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
                                onToggle(trick.id)
                            }
                            }
                        ]
                    )
                }}
                style={[styles.checkbox, landed && styles.checkboxChecked]}
                hitSlop={10}
            >
                {landed &&
                    <Text style={styles.checkmark}>
                        ✓
                    </Text>}

            </Pressable>
            <Pressable
                onPress={() => {
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
                    Alert.alert("Delete trick?",
                        `${trick.trickName}\n${trick.description}`, [
                        { text: "Cancel", style: "cancel" },
                        { text: "Delete", style: "destructive", onPress: () => {
                            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
                            onDelete(trick.id) }
                        },
                    ])
                }}
                delayLongPress={800}
                hitSlop={10}
            >
                <Text style={{ fontSize: 20 }}>🗑️</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        width: "100%"
    },
    checkbox: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: "#999",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,
    },
    checkboxChecked: {
        backgroundColor: "#B9F34A",
        borderColor: "#B9F34A",
    },
    checkmark: {
        color: "black",
        fontWeight: "bold",
    },
    texts: {
        flex: 1,
    },
    name: {
        fontWeight: "bold",
    },
    nameLanded: {
        color: "#777",
        textDecorationLine: "line-through"
    },
});