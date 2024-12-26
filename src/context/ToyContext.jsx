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

  // Update purchaseCount for a specific toy
  const updatePurchaseCount = async (id, action) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/toys/${id}/update`,
        { action }
      );
      const updatedToy = response.data;
      setToys((prevToys) =>
        prevToys.map((toy) => (toy._id === updatedToy._id ? updatedToy : toy))
      );
    } catch (error) {
      console.error("Error updating purchase count:", error);
    }
  };

  useEffect(() => {
    fetchToys();
  }, []);

  return (
    <ToyContext.Provider
      value={{ toys, loading, fetchToys, updatePurchaseCount }}
    >
      {children}
    </ToyContext.Provider>
  );
};
