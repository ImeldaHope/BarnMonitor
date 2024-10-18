// src/components/AnimalTypeList.jsx
import React, { useState, useEffect } from 'react';

const AnimalTypeList = () => {
  const [animalTypes, setAnimalTypes] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/animal_types')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch animal types');
        }
        return res.json();
      })
      .then((data) => {
        setAnimalTypes(data);
        setErrorMessage('');
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage('Failed to load animal types');
      });
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Animal Types</h2>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <ul className="bg-white shadow-md rounded px-6 py-4">
        {animalTypes.length > 0 ? (
          animalTypes.map((type) => (
            <li key={type.id} className="border-b py-2">
              <strong>{type.type_name}</strong> - {type.description}
            </li>
          ))
        ) : (
          <p className="text-gray-600">No animal types available.</p>
        )}
      </ul>
    </div>
  );
};

export default AnimalTypeList;
