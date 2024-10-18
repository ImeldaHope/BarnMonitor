// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AnimalTypeList from "./components/AnimalTypeList";
import AddHealthRecord from "./components/AddHealthRecord";
import SplashScreen from "./components/SplashScreen";
import Sidebar from "./components/Sidebar";
import Animals from "./components/Animals";
import AnimalDetail from "./components/AnimalDetail";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  return (
    <>
      <div className='flex items-start'>
        <div className='fixed top-0 left-0'>
          <Sidebar/>
        </div>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/animal-types" element={<AnimalTypeList />} />
            <Route path="/health-records" element={<AddHealthRecord />} />
            <Route path="/login" element={<Login />} />
            <Route path="/animal-types" element={<AnimalTypeList />} />
            <Route path="/health-records" element={<AddHealthRecord />} />
            <Route path="/animals" element={<Animals />} />
            <Route path="/animal_detail/:animalId" element={<AnimalDetail />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
