import React, { createContext, useContext, useState, useEffect } from "react";

// Create UserContext
export const UserContext = createContext();

// Custom Hook to use UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// UserProvider Component to wrap the app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || {}
  ); // State to store user data

  // Load user from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    console.log("storedData", storedUser);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function to set user data in context and localStorage
  const login = (userData) => {
    console.log("User Data Received in Context:", userData);
    setUser(userData);
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
  };

  // Logout function to clear user data from context and localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <UserContext.Provider value={{ user, login, logout,setUser }}>
      {children}
    </UserContext.Provider>
  );
};
