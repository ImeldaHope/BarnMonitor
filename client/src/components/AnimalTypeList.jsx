// src/components/AnimalTypeList.jsx
import React, { useState, useEffect } from 'react';

const AnimalTypeList = () => {
  const [animalTypes, setAnimalTypes] = useState([]);

  useEffect(() => {
    fetch('/api/animal_types')
      .then(res => res.json())
      .then(data => setAnimalTypes(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h2>Animal Types</h2>
      <ul>
        {animalTypes.map((type) => (
          <li key={type.id}>{type.type_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AnimalTypeList;
