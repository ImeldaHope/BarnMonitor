// src/components/SplashScreen.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/barnmonitor-logo.svg';

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
    <>
      <div className="flex justify-center items-center ms-60 ">
        <img
          src={logo}
          alt="barn-monitor-logo"
          className="w-full h-full max-w-xs max-h-xs"
        />        
      </div>
    </>
    
  );
};

export default SplashScreen;
