// src/components/SplashScreen.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Assuming you handle general styling here

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate a delay before navigating to login
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000); // 3 seconds delay
    return () => clearTimeout(timer); // Cleanup timer
  }, [navigate]);

  return (
    <div className="splash-container">
      <img
        src="/src/assets/farmgenics_logo.png"
        alt="FarmGenics Logo"
        className="splash-logo"
      />
      <h1>FarmGenics</h1>
      <p>Cattle Management made easier</p>
    </div>
  );
};

export default SplashScreen;
