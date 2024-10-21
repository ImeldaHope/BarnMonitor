// src/App.jsx
import React, { useEffect, useState } from "react";
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
  const [user, setUser] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log('i am looged in in app as: ',user.id)
  console.log('Am i logged in? ', isLoggedIn)
  console.log('I am the logged in user: ', user)

  useEffect(() => {
    fetch("http://127.0.0.1:5000/check_session",{
      credentials: 'include',
      method: 'GET'
    }).then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      } else{
        console.log('I have failed to fetch the user')
      }
    });
  }, []); 
  
  function handleLogin(user) {
    setUser(user);
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setUser(null);
    setIsLoggedIn(false)
  }

  return (
    <>
      <div className="flex items-start">
        <div className="fixed top-0 left-0 ">
        {isLoggedIn && <Sidebar onLogout={handleLogout}/>}
        </div>
        <div className="ml-60 w-full">
          <Router>
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard farmerId={user.id} />} />
              <Route path="/animal_types" element={<AnimalTypeList />} />
              <Route path="/health_records" element={<AddHealthRecord />} />
              <Route path="/login" element={<Login onLogin={handleLogin}/>} />
              <Route path="/animals" element={<Animals farmerId={user.id}/>} />
              <Route path="/animal_detail/:animalId" element={<AnimalDetail />} />
            </Routes>
          </Router>
        </div>
      </div>
    </>
  );
};

export default App;
