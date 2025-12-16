import { createContext, useContext, useState } from "react";


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState({ name: "John Doe" });
  const [role, setRole] = useState("user"); 

  return (
    <AuthContext.Provider value={{ user, role, setUser, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
