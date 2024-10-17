// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AnimalTypeList from './components/AnimalTypeList';
import AddHealthRecord from './components/AddHealthRecord';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/animal-types" element={<AnimalTypeList />} />
          <Route path="/health-records" element={<AddHealthRecord />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
