import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View, FlatList } from "react-native";
import { TrickItem } from "../components/TrickItem";
import { Trick } from "../types/Trick";

type Status = Trick["status"];


export function Tricks() {

    const [trickName, setTrickName] = useState(""); // tempun nimi
    const [description, setDescription] = useState(""); // tempun kuvaus
    const [tricks, setTricks] = useState<Trick[]>([]); // lista tempuille
    const [activeTab, setActiveTab] = useState<Status>("In Progress");

    const tabs: Status[] = ["In Progress", "Landed"];

    const visibleTricks = tricks.filter((t) => t.status === activeTab);


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

    function deleteTrick(id: string) {
        setTricks((prev) => prev.filter((t) => t.id !== id));
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


            <View style={styles.tabs}>
                {tabs.map((tab) => {
                    const count = tricks.filter((t) => t.status === tab).length;
                    const active = tab === activeTab;
                    return (
                        <Pressable
                            key={tab}
                            style={[styles.tab, active && styles.tabActive]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabText, active && styles.tabTextActive]}>
                                {tab} ({count})
                            </Text>
                        </Pressable>
                    );
                })}
            </View>

            <FlatList
                style={styles.list}
                contentContainerStyle={styles.listContent}
                data={visibleTricks}
                keyExtractor={(item) => item.id}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                ListEmptyComponent={
                    <Text style={{ fontSize: 18, paddingTop: 10 }}>
                        {activeTab === "In Progress" ? "No tricks in progress" : "No landed tricks yet"}
                    </Text>
                }
                renderItem={({ item }) => (
                    <TrickItem trick={item} onToggle={toggleTrick} onDelete={deleteTrick}/>
                )}
            />

        </View>
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
    list: {
        flex: 1,
        alignSelf: "stretch",
        marginTop: 16,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    tabs: {
        flexDirection: "row",
        alignSelf: "stretch",
        marginTop: 16,
        marginHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: "center",
        borderBottomWidth: 3,
        borderBottomColor: "transparent",
    },
    tabActive: {
        borderBottomColor: "#B9F34A",
    },
    tabText: {
        fontSize: 16,
        color: "#777",
    },
    tabTextActive: {
        color: "#000",
        fontWeight: "bold",
    },
});