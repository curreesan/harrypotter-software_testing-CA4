import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PurchasePage from "./pages/PurchasePage";
import LoginPage from "./pages/LoginPage";
import { ToyProvider } from "./context/ToyContext"; // Import ToyProvider

function App() {
  return (
    <ToyProvider>
      {" "}
      {/* Wrap the application with ToyProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/purchase" element={<PurchasePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </ToyProvider>
  );
}

export default App;
