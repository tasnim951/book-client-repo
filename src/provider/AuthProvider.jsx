import React, { createContext, useEffect, useState, useContext } from "react";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user"); 
  const [loading, setLoading] = useState(true);

  
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  
  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  
  const updateUserProfile = (name, photoURL) => {
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, { displayName: name, photoURL });
    } else {
      return Promise.reject(new Error("No user is logged in"));
    }
  };

  // Fetch role from backend
  const fetchUserRole = async (token) => {
    try {
      const res = await fetch("https://bookcourier-server-bice.vercel.app/user", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setRole(data.role || "user");
      } else {
        setRole("user");
      }
    } catch (err) {
      console.error("Failed to fetch user role:", err);
      setRole("user");
    }
  };

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const token = await currentUser.getIdToken();
        await fetchUserRole(token);
      } else {
        setRole("user"); 
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    role,
    loading,
    createUser,
    loginUser,
    googleLogin,
    logoutUser,
    updateUserProfile,
    setRole
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
