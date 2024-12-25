import React, { useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/PurchasePage.css";

const PurchasePage = () => {
  // Sample data for cart (can be dynamic later)
  const [cart, setCart] = useState({
    Harry: 2,
    Ron: 1,
    Hermione: 0,
  });

  // Handle purchase button click
  const handlePurchase = () => {
    // Check if the cart has items
    const itemsInCart = Object.values(cart).some((quantity) => quantity > 0);

    if (!itemsInCart) {
      alert("Please add something to the cart before purchasing!");
      return;
    }

    // Simulate the purchase process
    alert("Proceeding to payment...");
    // Here we can add payment handling logic later
  };

  return (
    <div className="purchase-page">
      <NavBar />
      <div className="cart-container">
        {/* Row 1: CART header */}
        <div className="cart-header">
          <h2>CART</h2>
        </div>

        {/* Row 2: Cart items list */}
        <div className="cart-items">
          <div className="cart-item">
            <div className="cart-item-name">Harry</div>
            <div className="cart-item-quantity">{cart.Harry}</div>
          </div>
          <div className="cart-item">
            <div className="cart-item-name">Ron</div>
            <div className="cart-item-quantity">{cart.Ron}</div>
          </div>
          <div className="cart-item">
            <div className="cart-item-name">Hermione</div>
            <div className="cart-item-quantity">{cart.Hermione}</div>
          </div>
        </div>

        {/* Row 3: Purchase button */}
        <div className="purchase-button">
          <button onClick={handlePurchase}>Purchase</button>
        </div>
      </div>
    </div>
  );
};

export default PurchasePage;
