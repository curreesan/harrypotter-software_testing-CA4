import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css"; // Assuming NavBar.css is in the same folder

const NavBar = ({ user }) => {
  const navigate = useNavigate();

  // If user is logged in, show their username, otherwise show 'Login / Sign Up'
  const handleLoginLogoutClick = () => {
    if (user) {
      // Redirect to Login/SignUp page to show user details (this can be adjusted later)
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img
          src="/src/images/hogwarts.logo"
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
        <button
          className="nav-link login-signup"
          onClick={handleLoginLogoutClick}
        >
          {user ? user.username : "Login / Sign Up"}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
