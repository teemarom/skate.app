import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View, FlatList, Image } from "react-native";
import { TrickItem } from "../components/TrickItem";
import { Trick } from "../types/Trick";
import { auth, database } from "../config/firebaseConfig";
import { ref, push, onValue, update, remove } from "firebase/database"

type Status = Trick["status"];


export function Tricks() {

    const [trickName, setTrickName] = useState(""); // tempun nimi
    const [details, setDetails] = useState(""); // tempun lisätiedot
    const [tricks, setTricks] = useState<Trick[]>([]); // lista tempuille
    const [activeTab, setActiveTab] = useState<Status>("In Progress"); // oletustab

    const uid = auth.currentUser?.uid;

    const tabs: Status[] = ["In Progress", "Landed"];

    const visibleTricks = tricks.filter((t) => t.status === activeTab);

    // tempun lisäys
    function addTrick() {
        if (!trickName.trim() || !uid) return; // estää lisäyksen jos tyhjä nimi

        push(ref(database, `users/${uid}/tricks`), {
            trickName: trickName.trim(),
            details,
            status: "In Progress"
        });

        setTrickName("");
        setDetails("")
    }

    // tempun poisto
    function deleteTrick(id: string) {
        if (!uid) return;
        remove(ref(database, `users/${uid}/tricks/${id}`));
    }

    // tempun siirto listojen välillä
    function toggleTrick(id: string) {
        if (!uid) return;
        const trick = tricks.find((t) => t.id === id);
        if (!trick) return;

        update(ref(database, `users/${uid}/tricks/${id}`), {
            status: trick.status === "In Progress" ? "Landed" : "In Progress",
        });
    }

    // hae temput tietokannasta
    useEffect(() => {
        if (!uid) return;

        const unsubscribe = onValue(ref(database, `users/${uid}/tricks`), (snapshot) => {
            const data = snapshot.val();
            const list: Trick[] = data
                ? Object.entries(data).map(([id, value]) => ({
                    id,
                    ...(value as Omit<Trick, "id">),
                }))
                : [];
            setTricks(list);
        });
        return unsubscribe;
    }, [uid]);

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.logo}>Your Tricks</Text>
            </View>

            {/*User input to add trick*/}
            <View>
                <Text style={{ fontSize: 20, fontWeight: "500" }}>Trick:</Text>
                <TextInput style={styles.inputTrick}
                    placeholder="Trick name (required)"
                    value={trickName}
                    onChangeText={setTrickName}
                />

                <Text style={{ fontSize: 20, fontWeight: "400" }}>Details (location, obstacle):</Text>
                <TextInput style={styles.inputDetails}
                    placeholder="Details (optional)"
                    value={details}
                    onChangeText={setDetails}
                    multiline
                />
                <Pressable style={styles.addButton} onPress={addTrick}>
                    <Text style={styles.addButtonText}>Add Trick</Text>
                </Pressable>
            </View>

            {/*tabit*/}
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

            {/*temput listattuna */}
            <FlatList
                style={styles.list}
                contentContainerStyle={styles.listContent}
                data={visibleTricks}
                keyExtractor={(item) => item.id}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                ListEmptyComponent={
                    <Text style={{ fontSize: 18, paddingTop: 10 }}>
                        {activeTab === "In Progress" ? "Add a trick you want to learn" : "No landed tricks yet"}
                    </Text>
                }
                renderItem={({ item }) => (
                    <TrickItem trick={item} onToggle={toggleTrick} onDelete={deleteTrick} />
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
    inputDetails: {
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
        borderRadius: 10,
        height: 40,
        width: 280,
    },
    addButtonText: {
        color: "black",
        fontSize: 22,
        textAlign: "center",
        fontWeight: "600"
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