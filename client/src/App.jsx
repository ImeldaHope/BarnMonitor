// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AnimalTypeList from "./components/AnimalTypeList";
import AddHealthRecord from "./components/AddHealthRecord";
import SplashScreen from "./components/SplashScreen";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/animal-types" element={<AnimalTypeList />} />
          <Route path="/health-records" element={<AddHealthRecord />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<SplashScreen />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
