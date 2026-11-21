import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { auth } from "../config/firebaseConfig";

type Props = {
  onSwitch: () => void
};

export default function LogIn({ onSwitch }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    if (!email.trim() || !password) {
      Alert.alert("Missing information", "Enter your email and password");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (error: any) {
      Alert.alert("Sign in failed", friendlyError(error.code));
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >

        <Image
          style={styles.image}
          source={require("../assets/signin.png")}
        />

        <Text style={styles.title}>Sign in</Text>

        {/*email*/}
        <TextInput style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {/*salasana */}
        <TextInput style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {/*sign in painike*/}
        <Pressable style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign in</Text>
        </Pressable>

        <Pressable onPress={onSwitch}>
          <Text style={styles.link}>No account?{" "}
            <Text style={styles.linkHighlight}>Create account here</Text>
          </Text>
        </Pressable>

      </ScrollView>
    </KeyboardAvoidingView>
  )

  function friendlyError(code: string) {
    switch (code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "Incorrect email or password.";
      case "auth/invalid-email":
        return "The email address is not valid.";
      case "auth/too-many-requests":
        return "Too many attempts. Try again later.";
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
    borderWidth: 1
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
  image: {
    width: 250,
    height: 250,
    alignSelf: "center",
  }
});