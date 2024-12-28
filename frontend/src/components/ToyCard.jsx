import React from "react";
import "./ToyCard.css";

const ToyCard = ({
  id,
  name,
  price,
  stock,
  img,
  onIncrease,
  onDecrease,
  purchaseCount,
}) => {
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
          <button className="quantity-btn" onClick={onDecrease}>
            -
          </button>
          <input
            type="number"
            min={0}
            max={stock}
            value={purchaseCount}
            readOnly
            className="quantity-input"
          />
          <button className="quantity-btn" onClick={onIncrease}>
            +
          </button>
        </div>
      </div>
      <div className="stock-left">{stock} left!</div>
    </div>
  );
};

export default ToyCard;
