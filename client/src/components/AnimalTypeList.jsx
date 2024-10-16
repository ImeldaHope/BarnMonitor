// client/src/components/AnimalTypeList.jsx
import React, { useState, useEffect } from 'react';

const AnimalTypeList = () => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetch('/animal_types')
      .then(response => response.json())
      .then(data => setTypes(data));
  }, []);

  return (
    <div>
      <h2>Animal Types</h2>
      <ul>
        {types.map((type, index) => (
          <li key={index}>{type}</li>
        ))}
      </ul>
    </div>
  );
};

export default AnimalTypeList;
