import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import ToyCard from "../components/ToyCard";
import { ToyContext } from "../context/ToyContext";
import "../styles/HomePage.css";

const HomePage = () => {
  const { toys, loading } = useContext(ToyContext);

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
            stock={toy.totalCount - toy.purchaseCount}
            img={toy.image}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
