import { createContext, useContext, useState } from "react";

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  // For now, hardcode a test user
  const [user, setUser] = useState({ name: "John Doe" });
  const [role, setRole] = useState("user"); // change to "librarian" or "admin" to test

  return (
    <AuthContext.Provider value={{ user, role, setUser, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth hook
export const useAuth = () => useContext(AuthContext);
