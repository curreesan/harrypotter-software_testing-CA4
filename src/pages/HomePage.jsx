// src/pages/HomePage.jsx
import React, { useContext, useEffect } from "react";
import NavBar from "../components/NavBar";
import ToyCard from "../components/ToyCard";
import { ToyContext } from "../context/ToyContext";
import { CartContext } from "../context/CartContext";

import "../styles/HomePage.css";

const HomePage = () => {
  const { cart, setCart } = useContext(CartContext);
  const { toys, loading, fetchToys } = useContext(ToyContext);

  useEffect(() => {
    fetchToys(); // Re-fetch data when HomePage is loaded
  }, [fetchToys]);

  const handleButtonClick = (toyId, action) => {
    const updatedCart = cart.slice();
    const toy = toys.find((item) => item._id === toyId);
    if (action === "increase") {
      console.log("handle", toy);
      const i = updatedCart.findIndex((item) => item._id === toyId);
      if (i !== -1) {
        updatedCart[i].purchaseCount = Math.min(
          toy.totalCount,
          updatedCart[i].purchaseCount + 1
        );
      } else {
        updatedCart.push({ _id: toyId, name: toy.name, purchaseCount: 1 });
      }
    }
    setCart(updatedCart);
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
            stock={toy.totalCount}
            img={toy.image}
            purchaseCount={
              cart.find((item) => item._id === toy._id)?.purchaseCount || 0
            }
            onIncrease={() => handleButtonClick(toy._id, "increase")}
            onDecrease={() => handleButtonClick(toy._id, "decrease")}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
