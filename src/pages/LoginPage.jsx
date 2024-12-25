import React, { useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/LoginPage.css";

const LoginPage = () => {
  // States for form data
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      // Validate Sign Up
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
      // Handle sign up logic (e.g., save to database, create account)
      setErrorMessage("Account successfully created! Please log in.");
    } else {
      // Validate Login
      if (formData.username === "" || formData.password === "") {
        setErrorMessage("Please enter both username/email and password");
        return;
      }
      // Handle login logic (e.g., authenticate user)
      setErrorMessage("Login successful!");
    }
  };

  return (
    <div className="login-page">
      <NavBar />
      <div className="form-container">
        {/* Row 1: Toggle buttons for Sign Up / Login */}
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

        {/* Row 2: Form */}
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

        {/* Row 3: Submit button and error message */}
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
