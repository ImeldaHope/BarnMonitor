// src/components/AnimalTypeList.jsx
import React, { useState, useEffect } from 'react';
import '../styles/type.css'

const AnimalTypeList = () => {
  const [animalTypes, setAnimalTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // for sorting

  useEffect(() => {
    // Simulate fetching animal types
    const mockAnimalTypes = [
      { id: 1, type_name: 'Cow', description: 'Produces milk and beef' },
      { id: 2, type_name: 'Chicken', description: 'Lays eggs and produces meat' },
      { id: 3, type_name: 'Sheep', description: 'Produces wool and meat' },
    ];
    setAnimalTypes(mockAnimalTypes);
  }, []);

  const handleSort = () => {
    const sortedAnimalTypes = [...animalTypes].sort((a, b) => {
      const nameA = a.type_name.toLowerCase();
      const nameB = b.type_name.toLowerCase();
      return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
    setAnimalTypes(sortedAnimalTypes);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredAnimalTypes = animalTypes.filter((type) =>
    type.type_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-primary_1 font-black text-2xl mb-8">Animal Types</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by Animal Type"
        className="mb-4 shadow border rounded w-full py-2 px-3 text-gray-700"
      />
      <button onClick={handleSort} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Sort by Type Name ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
      </button>
      <ul className="bg-green-100 shadow-md rounded px-6 py-4 mt-4">
        {filteredAnimalTypes.length > 0 ? (
          filteredAnimalTypes.map((type) => (
            <li key={type.id} className="border-b py-2">
              <h2 className="text-primary_1 font-black text-2xl mb-8"><strong>{type.type_name}</strong> - {type.description}
              </h2></li>
          ))
        ) : (
          <p className="text-gray-600">No animal types available.</p>
        )}
      </ul>
    </div>
  );
};

export default AnimalTypeList;
