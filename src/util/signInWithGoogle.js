import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase";

/**
 *
 * @returns true if sign in with Google is successful, otherwise return false
 */
export default async function handleGoogleSignIn() {
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            await setDoc(docRef, {
                name: user.displayName,
                email: user.email,
                timestamp: serverTimestamp(),
            });
        }
        toast.success("Sign up was successful!");
        return true;
    } catch (error) {
        toast.error(error.message);
        return false;
    }
}
