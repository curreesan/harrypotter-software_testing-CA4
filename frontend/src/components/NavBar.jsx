import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css"; // Assuming NavBar.css is in the same folder
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { setCart } = useContext(CartContext);

  // If user is logged in, show their username, otherwise show 'Login / Sign Up'
  const handleLogin = () => navigate("/login");

  const handleLogout = () => {
    setUser(null);
    setCart([]);

    localStorage.removeItem("token");
    navigate("/");
  };

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
          <a onClick={() => handleLogout()} className="nav-link">
            Logout &rarr;
          </a>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
