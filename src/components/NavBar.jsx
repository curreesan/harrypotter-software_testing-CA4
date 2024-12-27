import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css"; // Assuming NavBar.css is in the same folder
import { UserContext } from "../context/UserContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // If user is logged in, show their username, otherwise show 'Login / Sign Up'
  const handleLogin = () => navigate("/login");

  const handleLogout = () => {};

  return (
    <nav className="navbar">
      <div className="logo">
        <img
          src="/hogwartslogo.webp"
          alt="Kinderjoy Logo"
          className="logo-img"
        />
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/purchase" className="nav-link">
          Purchase
        </Link>

        {!user ? (
          <button className="nav-link login-signup" onClick={handleLogin}>
            {user ? user.username : "Login / Sign Up"}
          </button>
        ) : (
          <a className="nav-link">Logout &rarr;</a>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
