// src/components/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <nav className="sidebar">
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
        </ul>
      </nav>
      <div className="content">
        {/* Dynamic content based on route will be rendered here */}
      </div>
    </div>
  );
};

export default Dashboard;
