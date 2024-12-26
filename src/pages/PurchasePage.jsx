import React, { useState, useContext } from "react";
import NavBar from "../components/NavBar";
import { UserContext } from "../context/UserContext"; // Import UserContext
import "../styles/PurchasePage.css";

const PurchasePage = () => {
  const [cart, setCart] = useState({
    Harry: 2,
    Ron: 1,
    Hermione: 0,
  });
  const { user } = useContext(UserContext); // Access user data from context

  const handlePurchase = () => {
    const itemsInCart = Object.values(cart).some((quantity) => quantity > 0);

    if (!user) {
      alert("Please log in to proceed with the purchase.");
      return;
    }

    if (!itemsInCart) {
      alert("Please add something to the cart before purchasing!");
      return;
    }

    alert("Proceeding to payment...");
  };

  return (
    <div className="purchase-page">
      <NavBar />
      <div className="cart-container">
        <div className="cart-header">
          <h2>CART</h2>
        </div>
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
        <div className="purchase-button">
          <button onClick={handlePurchase}>Purchase</button>
        </div>
      </div>
    </div>
  );
};

export default PurchasePage;
