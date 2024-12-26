// src/pages/PurchasePage.jsx
import React, { useContext, useEffect } from "react";
import NavBar from "../components/NavBar";
import { UserContext } from "../context/UserContext";
import { ToyContext } from "../context/ToyContext";
import "../styles/PurchasePage.css";

const PurchasePage = () => {
  const { toys, fetchToys } = useContext(ToyContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchToys(); // Re-fetch data when PurchasePage is loaded
  }, [fetchToys]);

  const handlePurchase = async () => {
    if (!user) {
      alert("Please log in to proceed with the purchase.");
      return;
    }

    const itemsToPurchase = toys.filter((toy) => toy.purchaseCount > 0);

    if (itemsToPurchase.length === 0) {
      alert("Please add something to the cart before purchasing!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/toys/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          itemsToPurchase.map(({ _id, purchaseCount }) => ({
            id: _id,
            purchaseCount,
          }))
        ),
      });

      if (response.ok) {
        alert("Purchase successful!");
        fetchToys(); // Re-fetch data after purchase
      } else {
        alert("Error during purchase.");
      }
    } catch (error) {
      console.error("Error during purchase:", error);
    }
  };

  return (
    <div className="purchase-page">
      <NavBar />
      <div className="cart-container">
        <div className="cart-header">
          <h2>Your Cart</h2>
        </div>
        <div className="cart-items">
          {toys.map((toy) => (
            <div className="cart-item" key={toy._id}>
              <div className="cart-item-name">{toy.name}</div>
              <div className="cart-item-quantity">{toy.purchaseCount}</div>
            </div>
          ))}
        </div>
        <div className="purchase-button">
          <button onClick={handlePurchase}>Purchase</button>
        </div>
      </div>
    </div>
  );
};

export default PurchasePage;
