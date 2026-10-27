import { useState } from "react";
import { SectionList, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { TrickItem } from "../components/TrickItem";
import { Trick } from "../types/Trick";


type Props = {
    onToggle: (id: string) => void;
}

export function Tricks() {

    const [trickName, setTrickName] = useState(""); // tempun nimi
    const [description, setDescription] = useState(""); // tempun kuvaus
    const [tricks, setTricks] = useState<Trick[]>([]); // lista tempuille

    const sections = [
        { title: "In progress", data: tricks.filter((t) => t.status === "In Progress") },
        { title: "Landed", data: tricks.filter((t) => t.status === "Landed") },
    ];


    function addTrick() {
        if (!trickName.trim()) return; // estää lisäyksen jos tyhjä nimi

        const newTrick: Trick = {
            id: Date.now().toString(), // väliaikainen id testaukseen
            trickName,
            description,
            status: "In Progress"
        }
        setTricks([...tricks, newTrick]); // lisää tempun listaan
        setTrickName("");
        setDescription("")
    }

    function toggleTrick(id: string) {
        setTricks((prev) =>
            prev.map((t) =>
                t.id === id
                    ? { ...t, status: t.status === "In Progress" ? "Landed" : "In Progress" }
                    : t
            )
        );
    }

    return (
        //<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.logo}>SKATETRICKS</Text>
                </View>

                {/*User input to add trick*/}
                <View>
                    <Text style={{ fontSize: 20 }}>Add a trick:</Text>
                    <TextInput style={styles.inputTrick}
                        placeholder="Trick"
                        value={trickName}
                        onChangeText={setTrickName}
                    />

                    <Text style={{ fontSize: 20 }}>Add description:</Text>
                    <TextInput style={styles.inputDescription}
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                    />
                    <Pressable style={styles.addButton} onPress={addTrick}>
                        <Text style={styles.addButtonText}>ADD TRICK</Text>
                    </Pressable>
                </View>

                {/* TODO: Lisää flatlist tähän*/}
                <SectionList
                    style={styles.list}
                    contentContainerStyle={styles.listContent}
                    sections={sections}
                    keyExtractor={(item) => item.id}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                    ListEmptyComponent={<Text style={{ fontSize: 18, paddingTop: 10 }}>No added tricks yet</Text>}
                    renderSectionHeader={({ section }) => (
                        <Text style={styles.sectionHeader}>{section.title}</Text>
                    )}
                    renderItem={({ item }) => (
                        <TrickItem trick={item} onToggle={toggleTrick} />
                    )}
                />

            </View>

        //</TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    header: {
        margin: 30,
    },
    logo: {
        color: "#B9F34A",
        fontSize: 27,
        fontWeight: "900",
        letterSpacing: 2,
    },
    inputTrick: {
        borderWidth: 1,
        borderRadius: 7,
        borderColor: "gray",
        width: 280,
        height: 30,
        marginBottom: 10,
    },
    inputDescription: {
        borderWidth: 1,
        borderRadius: 7,
        borderColor: "gray",
        width: 280,
        height: 60,
        marginBottom: 10,
    },
    addButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#B9F34A",
        borderWidth: 1,
        borderRadius: 7,
        height: 40,
        width: 280,
    },
    addButtonText: {
        color: "white",
        fontSize: 24,
        textAlign: "center"
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: "bold",
        paddingVertical: 8,
        backgroundColor: "white",
        textDecorationLine: "underline"
    },
    list: {
        flex: 1,
        alignSelf: "stretch",
        marginTop: 16,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
});