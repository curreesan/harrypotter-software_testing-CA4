import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PurchasePage from "./pages/PurchasePage";
import LoginPage from "./pages/LoginPage";
import { ToyProvider } from "./context/ToyContext"; // Import ToyProvider
import { UserProvider } from "./context/UserContext"; // Import UserProvider

function App() {
  return (
    <UserProvider>
      {" "}
      {/* Wrap the application with UserProvider for authentication */}
      <ToyProvider>
        {" "}
        {/* Wrap the application with ToyProvider for toy data */}
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/purchase" element={<PurchasePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
      </ToyProvider>
    </UserProvider>
  );
}

export default App;
