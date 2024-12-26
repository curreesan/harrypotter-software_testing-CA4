import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import ToyCard from "../components/ToyCard";
import { ToyContext } from "../context/ToyContext";
import { UserContext } from "../context/UserContext"; // Import UserContext
import "../styles/HomePage.css";

const HomePage = () => {
  const { toys, loading } = useContext(ToyContext);
  const { user } = useContext(UserContext); // Access user data from context

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleButtonClick = (toy) => {
    if (!user) {
      alert("Please log in to modify the cart.");
      return;
    }
    // Continue with + or - button functionality
    console.log("Button clicked for toy:", toy);
  };

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
            onClick={() => handleButtonClick(toy)} // Add onClick event to handle button logic
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
