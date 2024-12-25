import React from "react";
import "./PopUp.css";

const PopUp = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-message">{message}</div>
        <button className="popup-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PopUp;
