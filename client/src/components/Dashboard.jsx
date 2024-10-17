// src/components/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/login'; // Redirect to login after logout
  };
  return (
    <div className="dashboard">
      <nav className="sidebar">
      <div>
      <h1>Welcome to the Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
        <ul>
          <li>
            <Link to="/animal-types">Animal Types</Link>
          </li>
          <li>
            <Link to="/health-records">Health Records</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
          <li>
            <Link to="/">home</Link>
          </li>
        </ul>
      </nav>
      <div className="content">
        {/* Dynamic content based on route will be rendered here */}
      </div>
    </div>
  );
};

export default Dashboard;
