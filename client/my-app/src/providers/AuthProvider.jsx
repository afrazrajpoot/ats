import React, { createContext, useContext, useEffect, useState } from "react";

// Create the context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loginUser, setLoginUser] = useState(false);

  const tokenInLocal = (data) => {
    localStorage.setItem("userData", JSON.stringify(data));
    if (data?.recruiter === true) {
      setLoginUser(data);
      localStorage.setItem("userType", "Recruiter");
    }
    if (data?.user === true) {
      setLoginUser(data);
      localStorage.setItem("userType", "User");
    }
  };

  const logout = () => {
    localStorage.removeItem("userData");
    setLoginUser(false);
  };

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      setLoginUser(JSON.parse(data));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loginUser, logout, tokenInLocal }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
