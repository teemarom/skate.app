import { useState } from "react";
import LogIn from "./LogIn";
import CreateAccount from "./CreateAccount";



export default function LogInScreen() {
    const [mode, setMode] = useState<"signin" | "signup">("signin");

    return mode === "signin" ? (
        <LogIn onSwitch={() => setMode("signup")} />
    ) : (
        <CreateAccount onSwitch={() => setMode("signin")} />
    );
}