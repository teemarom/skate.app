import { useState } from "react";
import { FlatList, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { TrickItem } from "../components/TrickItem";

type Trick = {
    id: string,
    trickName: string,
    description: string
}

export function Tricks() {

    const [trickName, setTrickName] = useState(""); // tempun nimi
    const [description, setDescription] = useState(""); // tempun kuvaus
    const [tricks, setTricks] = useState<Trick[]>([]); // lista tempuille

    function addTrick() {
        if (!trickName.trim()) return; // estää lisäyksen jos tyhjä nimi

        const newTrick: Trick = {
            id: Date.now().toString(), // väliaikainen id testaukseen
            trickName,
            description,
        }
        setTricks([...tricks, newTrick]); // lisää tempun listaan
        setTrickName("");   
        setDescription("")
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.logo}>SKATETRICKS</Text>
                </View>

                {/*User input to add trick*/}
                <View> 
                    <Text style={{fontSize: 20}}>Add a trick:</Text>
                    <TextInput style={styles.inputTrick}
                        placeholder="Trick"
                        value={trickName}
                        onChangeText={setTrickName}
                    />

                    <Text style={{fontSize: 20}}>Add description:</Text>
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
                <FlatList
                    data={tricks}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={<Text>No added tricks yet</Text>}
                    renderItem={({item}) => (
                        <TrickItem trick={item} />
                    )}
                />
            </View>

        </TouchableWithoutFeedback>
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
        marginBottom:10,
    },
    inputDescription: {
        borderWidth: 1,
        borderRadius: 7,
        borderColor: "gray",
        width: 280,
        height: 60,
        marginBottom:10,
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
    }
});