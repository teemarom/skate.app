import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";


type Props = {
    onSwitch: () => void
};

export default function SignUp({ onSwitch }: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSignUp() {
        const trimmedEmail = email.trim();

        if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
            Alert.alert("Invalid email", "Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Weak password", "Password must be atleast 6 characters");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, trimmedEmail, password);
        } catch (error: any) {
            Alert.alert("Registeration failed", friendlyError(error.code));
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create account</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Pressable style={styles.button} onPress={handleSignUp} >
                <Text style={styles.buttonText}>Register</Text>
            </Pressable>
            <Pressable onPress={onSwitch}>
                <Text style={styles.link}>Already have an account? Sign in</Text>
            </Pressable>
        </View>
    )

    function friendlyError(code: string) {
        switch (code) {
            case "auth/email-already-in-use":
                return "This email is already registered.";
            case "auth/invalid-email":
                return "The email address is not valid.";
            case "auth/weak-password":
                return "Password is too weak.";
            default:
                return "Something went wrong. Please try again.";
        }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    gap: 12
},
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12
},
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 7,
    padding: 10
},
  button: {
    backgroundColor: "#B9F34A",
    padding: 14,
    borderRadius: 10,
    alignItems: "center"
},
  buttonText: {
    color: "black",
    fontWeight: "600"
},
  link: {
    textAlign: "center",
    color: "#555",
    marginTop: 8
},
});