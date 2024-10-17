// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AnimalTypeList from './components/AnimalTypeList';
import AddHealthRecord from './components/AddHealthRecord';
import Sidebar from './components/Sidebar';
import Animals from './components/Animals';
import AnimalDetail from './components/AnimalDetail';

function App() {
  return (
<<<<<<< HEAD
    <>
      <div className='flex items-start'>
        <div className='fixed top-0 left-0'>
          <Sidebar/>
        </div>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/animal-types" element={<AnimalTypeList />} />
            <Route path="/health-records" element={<AddHealthRecord />} />
            <Route path="/animals" element={<Animals />} />
            <Route path="/animal_detail" element={<AnimalDetail />} />
          </Routes>
        </Router>
      </div>
    </>
=======
   
>>>>>>> main
  );
}

export default App;
