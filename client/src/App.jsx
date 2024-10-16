import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import AnimalTypeList from './components/AnimalTypeList';
import AddHealthRecord from './components/AddHealthRecord';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/animal-types" element={<AnimalTypeList />} />
        <Route path="/add-health-record" element={<AddHealthRecord />} />
      </Routes>
    </Router>
  );
}

export default App;
