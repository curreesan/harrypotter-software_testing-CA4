import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PurchasePage from "./pages/PurchasePage";
import LoginPage from "./pages/LoginPage";
import { ToyProvider } from "./context/ToyContext";
import { UserProvider } from "./context/UserContext";
import CartProvider from "./context/CartContext";

function App() {
  return (
    // Wrap the application with UserProvider for authentication
    <UserProvider>
      {/* Wrap the application with ToyProvider for toy data */}
      <ToyProvider>
        {/* Wrap the application with CartProvider for cart state */}
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/purchase" element={<PurchasePage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </Router>
        </CartProvider>
      </ToyProvider>
    </UserProvider>
  );
}

export default App;
