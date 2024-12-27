// src/pages/PurchasePage.jsx
import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import "../styles/PurchasePage.css";

const PurchasePage = () => {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(UserContext);

  const calculateValue = (name, purchaseCount) => {
    if (name === "Harry") return purchaseCount * 100;
    if (name === "Ron") return purchaseCount * 80;
    if (name === "Hermione") return purchaseCount * 120;
    return purchaseCount; // Default to just showing the count if name doesn't match
  };

  const handlePurchase = async () => {
    if (!user) {
      alert("Please log in to proceed with the purchase.");
      return;
    }
    if (cart.length === 0) {
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
          cart.map(({ _id, purchaseCount }) => ({
            id: _id,
            purchaseCount,
          }))
        ),
      });

      if (response.ok) {
        alert("Purchase successful!");
        setCart([]); // Clear the cart after purchase
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
        {cart.length === 0 ? (
          <div className="empty-cart-message">
            <p>Your cart is empty. Add some items from the home page!</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((toy) => (
                <div className="cart-item" key={toy._id}>
                  <div className="cart-item-name">{toy.name}</div>
                  <div className="cart-item-quantity">
                    {calculateValue(toy.name, toy.purchaseCount)}$
                  </div>
                </div>
              ))}
            </div>
            <div className="purchase-button">
              <button onClick={handlePurchase}>Purchase</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PurchasePage;
