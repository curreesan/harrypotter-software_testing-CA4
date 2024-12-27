// src/context/ToyContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ToyContext = createContext();

export const ToyProvider = ({ children }) => {
  const [toys, setToys] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch toy data from the backend
  const fetchToys = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/toys");
      setToys(response.data); // Sync toys with backend
      setLoading(false);
    } catch (error) {
      console.error("Error fetching toy data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToys();
  }, []);

  return (
    <ToyContext.Provider value={{ toys, loading, fetchToys }}>
      {children}
    </ToyContext.Provider>
  );
};
