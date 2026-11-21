import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { useState } from "react";
import { Alert, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";


type Props = {
    onSwitch: () => void
};

export default function CreateAccount({ onSwitch }: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("")
    const passwordMatch = password === passwordAgain; // salasanojen vertailu

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
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView 
                contentContainerStyle ={styles.container}
                keyboardShouldPersistTaps="handled"
            >

                <Image
                    style={styles.image}
                    source={require("../assets/signup.png")}
                />

                <Text style={styles.title}>Create account</Text>
                {/*email*/}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                {/*salasana */}
                <TextInput
                    style={styles.input}
                    placeholder="Password (atleast 6 characters)"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                {/*salasana uudelleen */}
                <TextInput
                    style={styles.input}
                    placeholder="Re-type password"
                    value={passwordAgain}
                    onChangeText={setPasswordAgain}
                    secureTextEntry
                />

                {/*error msg */}
                {passwordAgain.length > 0 && !passwordMatch && (
                    <Text style={styles.error}>Passwords do not match</Text>
                )}

                {/*register painike */}
                <Pressable
                    style={[styles.button, !passwordMatch && styles.buttonDisabled]}
                    onPress={handleSignUp}
                    disabled={!passwordMatch}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </Pressable>

                <Pressable onPress={onSwitch}>
                    <Text style={styles.link}>
                        Already have an account?{" "}
                        <Text style={styles.linkHighlight}>Sign in</Text>
                    </Text>
                </Pressable>

            </ScrollView>
        </KeyboardAvoidingView>
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
    flex: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        gap: 12
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 12,
        textAlign: "center",
        textDecorationLine: "underline"
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
        alignItems: "center",
        borderWidth: 1,
    },
    buttonDisabled: {
        opacity: 0.4,
        backgroundColor: "red"
    },
    buttonText: {
        color: "black",
        fontWeight: "600",
        fontSize: 16,
    },
    link: {
        textAlign: "center",
        color: "#555",
        marginTop: 8
    },
    linkHighlight: {
        color: "#007AFF",
        textDecorationLine: "underline"
    },
    error: {
        color: "red",
        fontSize: 13
    },
    image: {
        width: 250,
        height: 250,
        alignSelf: "center",
    }
});