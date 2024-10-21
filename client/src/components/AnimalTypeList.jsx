import React, { useState, useEffect } from 'react';

const AnimalTypeList = () => {
  const [animalTypes, setAnimalTypes] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [typeName, setTypeName] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('http://127.0.0.1:5000/animal_types')
      .then(response => response.json())
      .then(data => setAnimalTypes(data))
      .catch(error => console.error('Error:', error))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAnimalType = { type_name: typeName, description };

    fetch('http://127.0.0.1:5000/animal_types', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAnimalType)
    })
      .then(response => response.json())
      .then(data => {
        setAnimalTypes([...animalTypes, data]);
        setTypeName('');
        setDescription('');
        setSuccessMessage('Animal type added successfully!');
      })
      .catch(error => {
        console.error('Error:', error);
        setErrorMessage('Failed to add animal type.');
      });
  };

  const handleTypeClick = (typeId) => {
    fetch(`http://127.0.0.1:5000/animal_types/${typeId}`)
      .then(response => response.json())
      .then(data => {
        setSelectedType(data.type);
        setAnimals(data.animals);
      })
      .catch(error => console.error('Error:', error));
  };

  const handleDelete = (typeId) => {
    if (window.confirm('Are you sure you want to delete this animal type?')) {
      fetch(`http://127.0.0.1:5000/animal_types/${typeId}`, {
        method: 'DELETE',
      })
      .then(() => {
        setAnimalTypes(animalTypes.filter(type => type.id !== typeId));
        setSuccessMessage('Animal type deleted successfully!');
      })
      .catch(error => {
        console.error('Error:', error);
        setErrorMessage('Failed to delete animal type.');
      });
    }
  };

  return (
    <div className="animal-type-container container mx-auto p-6">
      <h2 className="text-primary_1 font-black text-2xl mb-8">Animal Types</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={typeName}
          onChange={(e) => setTypeName(e.target.value)}
          placeholder="Type Name"
          className="border text-secondary_2 border-gray-300 rounded-lg p-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary_2 transition duration-200"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border text-secondary_2 border-gray-300 rounded-lg p-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary_2 transition duration-200"
        />
        <button className="p-3 font-bold text-white bg-primary_2 hover:bg-primary_2-dark rounded-lg transition duration-200 mb-4" type="submit">Add Animal Type</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      {loading && <p>Loading...</p>}
      
      <ul>
        {animalTypes.map(type => (
          <li className="text-primary_1 font-black text-2xl mb-8" key={type.id}>
            {type.type_name}
            <button className="text-gray-100 bg-blue-600 font-bold py-2 px-4 rounded hover:bg-primary_2 transition duration-200 ease-in-out flex space-x-4 mt-4" onClick={() => handleTypeClick(type.id)}>View Animals</button>
            <button className="text-gray-100 bg-red-600 font-bold py-2 px-4 rounded hover:bg-primary_2 transition duration-200 ease-in-out flex space-x-4 mt-4" onClick={() => handleDelete(type.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {selectedType && (
        <div>
          <h3 className="text-primary_1 font-black text-2xl mb-8">{selectedType.type_name} Animals</h3>
          <ul >
            {animals.map(animal => (
              <li className="text-primary_1 font-black text-2xl mb-8" key={animal.id}>
                <strong>{animal.name}</strong> - {animal.health_status} (Born: {animal.birth_date})
                <h4 className="text-primary_1 font-black text-2xl mb-8">Health Records</h4>
                <ul>
                  {animal.health_records && animal.health_records.map(record => (
                    <li className="text-primary_1 font-black text-2xl mb-8" key={record.id}>{record.treatment} by {record.vet_name} on {record.checkup_date}</li>
                  ))}
                </ul>
                <h4 className="text-primary_1 font-black text-2xl mb-8">Production Records</h4>
                <ul>
                  {animal.production_records && animal.production_records.map(record => (
                    <li className="text-primary_1 font-black text-2xl mb-8" key={record.id}>
                      {record.product_type}: {record.quantity} on {record.date}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AnimalTypeList;
