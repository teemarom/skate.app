import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";



export default function LogInScreen() {
    const [mode, setMode] = useState<"signin" | "signup">("signin");

    return mode === "signin" ? (
        <SignIn onSwitch={() => setMode("signup")} />
    ) : (
        <SignUp onSwitch={() => setMode("signin")} />
    );
}