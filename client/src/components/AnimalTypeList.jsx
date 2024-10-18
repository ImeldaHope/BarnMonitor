// src/components/AnimalTypeList.jsx
import React, { useState, useEffect } from 'react';

const AnimalTypeList = () => {
  const [animalTypes, setAnimalTypes] = useState([]);

  useEffect(() => {
    fetch('/api/animal_types')
      .then((res) => res.json())
      .then((data) => setAnimalTypes(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-primary_1 font-black text-2xl mb-8">Animal Types</h2>
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
