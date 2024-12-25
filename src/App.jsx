import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import PurchasePage from "./pages/PurchasePage";
import LoginPage from "./pages/LoginPage";

function App() {
  const user = { username: "john_doe" }; // Example logged-in user

  return (
    <Router>
      <NavBar user={user} /> {/* Pass the user object to NavBar */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/purchase" element={<PurchasePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
