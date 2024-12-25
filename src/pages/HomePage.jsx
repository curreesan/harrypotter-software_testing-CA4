import React, { useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/HomePage.css";

const HomePage = () => {
  // Sample toy data
  const toys = [
    { id: 1, name: "Harry", price: 10, stock: 5, img: "../images/ron.avif" },
    { id: 2, name: "Ron", price: 10, stock: 5, img: "/images/ron.jpg" },
    {
      id: 3,
      name: "Hermione",
      price: 10,
      stock: 5,
      img: "/images/hermione.jpg",
    },
  ];

  // State for managing quantities of toys
  const [quantities, setQuantities] = useState({
    Harry: 0,
    Ron: 0,
    Hermione: 0,
  });

  // Handle quantity change
  const handleQuantityChange = (toyName, action) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      if (action === "increment" && updatedQuantities[toyName] < 5) {
        updatedQuantities[toyName] += 1;
      } else if (action === "decrement" && updatedQuantities[toyName] > 0) {
        updatedQuantities[toyName] -= 1;
      }
      return updatedQuantities;
    });
  };

  return (
    <div className="home-page">
      <NavBar />
      <div className="toy-grid">
        {toys.map((toy) => (
          <div key={toy.id} className="toy-item">
            {/* Row 1: Toy Image */}
            <div className="toy-image">
              <img src={toy.img} alt={toy.name} />
            </div>

            {/* Row 2: Toy Details and Quantity Control */}
            <div className="toy-details">
              <div className="details-left">
                <div className="toy-name">{toy.name}</div>
                <div className="toy-price">${toy.price}</div>
              </div>

              <div className="details-right">
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(toy.name, "decrement")}
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantities[toy.name]}
                  readOnly
                  className="quantity-input"
                />
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(toy.name, "increment")}
                >
                  +
                </button>
              </div>
            </div>

            {/* Row 3: Stock Left */}
            <div className="stock-left">
              {toy.stock - quantities[toy.name]} left!
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
