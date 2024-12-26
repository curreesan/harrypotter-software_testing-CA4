import React, { useState } from "react";
import "./ToyCard.css";

const ToyCard = ({ id, name, price, stock, img }) => {
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (action) => {
    if (action === "increment" && quantity < stock) {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrement" && quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="toy-item">
      <div className="toy-image">
        <img src={img} alt={name} />
      </div>
      <div className="toy-details">
        <div className="details-left">
          <div className="toy-name">{name}</div>
          <div className="toy-price">${price}</div>
        </div>
        <div className="details-right">
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange("decrement")}
          >
            -
          </button>
          <input
            type="text"
            value={quantity}
            readOnly
            className="quantity-input"
          />
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange("increment")}
          >
            +
          </button>
        </div>
      </div>
      <div className="stock-left">{stock - quantity} left!</div>
    </div>
  );
};

export default ToyCard;
