import "./index.css";
import { auth, googleProvider } from "../database/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";


export const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(null);

    console.log(auth?.currentUser?.email);
    

    const signIn = async () => {
        try {

            await createUserWithEmailAndPassword(auth, email, password)
        }
        catch (err) {
            console.error(err)

        }
    };

    const signInWithGoogle = async () => {
        try {

            await signInWithPopup(auth, googleProvider)
        }
        catch (err) {
            console.error(err)

        }
    };

const logout = async () => {
    try {

        await signOut(auth)
    }
    catch (err) {
        console.error(err)

    }
}

    return (
        <div className="abc">
            <h2>Create Account</h2>
            <div className="abc">
                <input
                    type="text"
                    placeholder="Email..."
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password..."
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={signIn}>Create</button>

            <div>
                <button onClick={signInWithGoogle}>Sign In with Google</button>
            </div>
            <button onClick={logout}>Logout</button>
        </div>
    )
}