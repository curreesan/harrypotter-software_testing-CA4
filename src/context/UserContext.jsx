import React, { createContext, useState, useEffect } from "react";

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user data or null if not logged in
  const [token, setToken] = useState(localStorage.getItem("token")); // Store token in localStorage

  // On initial load, check if the user is logged in
  useEffect(() => {
    if (token) {
      // Optionally, decode the token to get user information (e.g., userId)
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUser({ userId: decodedToken.userId });
      console.log("decoded", decodedToken);
    }
  }, [token]);

  // Function to log in the user
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("token", jwtToken); // Store token in localStorage for persistence
  };

  // Function to log out the user
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token"); // Clear token from localStorage
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
