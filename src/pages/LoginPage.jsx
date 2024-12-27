import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext"; // Import the context
import NavBar from "../components/NavBar";
import "../styles/LoginPage.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext); // Access the login function from the context
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      if (!formData.email.includes("@")) {
        setErrorMessage("Invalid email format");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage("Passwords do not match");
        return;
      }
      if (formData.username === "") {
        setErrorMessage("Username is required");
        return;
      }

      // Handle sign-up logic (create user)
      try {
        const response = await fetch("http://localhost:5000/api/register", {
          // Full URL for backend
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();

        if (response.ok) {
          // Sign up successful, log the user in
          login({ username: formData.username }, data.token); // Login with the new user's data and token
          setErrorMessage("Account successfully created! Please log in.");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage("Error signing up");
      }
    } else {
      // Handle login logic
      if (formData.username === "" || formData.password === "") {
        setErrorMessage("Please enter both username/email and password");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/login", {
          // Full URL for backend
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();

        if (response.ok) {
          login({ username: formData.username }, data.token); // Login with the received token
          setErrorMessage("Login successful!");
          navigate("/purchase");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage("Error logging in");
      }
    }
  };

  return (
    <div className="login-page">
      <NavBar />
      <div className="form-container">
        <div className="toggle-buttons">
          <button
            onClick={() => setIsSignUp(true)}
            className={isSignUp ? "active" : ""}
          >
            Sign Up
          </button>
          <button
            onClick={() => setIsSignUp(false)}
            className={!isSignUp ? "active" : ""}
          >
            Login
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form">
          {isSignUp && (
            <>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </>
          )}
          {!isSignUp && (
            <>
              <input
                type="text"
                name="username"
                placeholder="Username or Email"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </>
          )}
        </form>

        <div className="submit-button">
          <button type="submit" onClick={handleSubmit}>
            {isSignUp ? "Sign Up" : "Log In"}
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
