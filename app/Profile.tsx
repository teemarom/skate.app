import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";



export default function Profile() {
    const email = auth.currentUser?.email;

    async function handleSignOut() {
        try {
            await signOut(auth);
        } catch (error) {
            Alert.alert("Sign out failed", "Please try again");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.label}>Signed in as:</Text>
            <Text style={styles.email}>{email}</Text>

            <Pressable style={styles.button} onPress={handleSignOut}>
                <Text style={styles.buttonText}>Sign out</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 24,
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20

  },
  label: {
    fontSize: 14,
    color: "#777"
  },
  email: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 24
  },
  button: {
    backgroundColor: "#B9F34A",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    width: 200,
  },
  buttonText: {
    color: "black",
    fontWeight: "600"
  },
});