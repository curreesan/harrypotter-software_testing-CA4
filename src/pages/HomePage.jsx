// src/pages/HomePage.jsx
import React, { useContext, useEffect } from "react";
import NavBar from "../components/NavBar";
import ToyCard from "../components/ToyCard";
import { ToyContext } from "../context/ToyContext";
import { UserContext } from "../context/UserContext";
import "../styles/HomePage.css";

const HomePage = () => {
  const { toys, loading, fetchToys, updatePurchaseCount } =
    useContext(ToyContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchToys(); // Re-fetch data when HomePage is loaded
  }, [fetchToys]);

  const handleButtonClick = (toyId, action) => {
    if (!user) {
      alert("Please log in to modify the cart.");
      return;
    }
    updatePurchaseCount(toyId, action);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-page">
      <NavBar />
      <div className="toy-grid">
        {toys.map((toy) => (
          <ToyCard
            key={toy._id}
            id={toy._id}
            name={toy.name}
            price={toy.price}
            stock={toy.totalCount - toy.purchaseCount}
            img={toy.image}
            purchaseCount={toy.purchaseCount}
            onIncrease={() => handleButtonClick(toy._id, "increase")}
            onDecrease={() => handleButtonClick(toy._id, "decrease")}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
