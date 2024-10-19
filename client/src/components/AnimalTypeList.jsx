// src/components/AnimalTypeList.jsx
import React, { useState, useEffect } from 'react';

const AnimalTypeList = () => {
  const [animalTypes, setAnimalTypes] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  // Fetch all animal types
  useEffect(() => {
    fetch('http://127.0.0.1:5000/animal_types')
      .then(response => response.json())
      .then(data => setAnimalTypes(data));
  }, []);

  // Fetch animals by animal type
  const handleTypeClick = (typeId) => {
    fetch(`http://127.0.0.1:5000/animal_types/${typeId}`)
      .then(response => response.json())
      .then(data => {
        setSelectedType(data.type);
        setAnimals(data.animals);
      });
  };

  return (
    <div>
      <h2>Animal Types</h2>
      <ul>
        {animalTypes.map(type => (
          <li key={type.id} onClick={() => handleTypeClick(type.id)}>
            {type.type_name}
          </li>
        ))}
      </ul>

      {selectedType && (
        <div>
          <h3>{selectedType.type_name} Animals</h3>
          <ul>
            {animals.map(animal => (
              <li key={animal.id}>{animal.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AnimalTypeList;
