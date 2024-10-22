
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AnimalTypeList from "./components/AnimalTypeList";
import AddHealthRecord from "./components/AddHealthRecord";
import SplashScreen from "./components/SplashScreen";
import Sidebar from "./components/Sidebar";
import Animals from "./components/Animals";
import AnimalDetail from "./components/AnimalDetail";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Farmer from "./components/Farmer";  // Imported Farmer component
import Feed from "./components/Feed";      // Imported Feed component

const App = () => {
  return (
    <>
      <div className="flex items-start">
        <div className="fixed top-0 left-0">
          <Sidebar />
        </div>
        <Router>
          <div className="content">
            {/* Navigation Links to Farmer and Feed */}
            <nav style={{ margin: '20px' }}>
              <Link to="/farmers" style={{ marginRight: '10px' }}>
                <button style={{ padding: '10px', backgroundColor: '#027217', color: '#fff', borderRadius: '4px' }}>
                  Farmers
                </button>
              </Link>
              <Link to="/feeds">
                <button style={{ padding: '10px', backgroundColor: '#3051A5', color: '#fff', borderRadius: '4px' }}>
                  Feeds
                </button>
              </Link>
            </nav>

            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/animal_types" element={<AnimalTypeList />} />
              <Route path="/health_records" element={<AddHealthRecord />} />
              <Route path="/login" element={<Login />} />
              <Route path="/animals" element={<Animals />} />
              <Route path="/animal_detail/:animalId" element={<AnimalDetail />} />
              <Route path="/farmer" element={<Farmer />} />  {/* Farmer route */}
              <Route path="/feeds" element={<Feed />} />      {/* Feed route */}
            </Routes>
          </div>
        </Router>
      </div>
    </>
  );
};

export default App;
