import React, { useState, useEffect } from 'react';

const AnimalTypeList = () => {
  const [animalTypes, setAnimalTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // for sorting
  const [newType, setNewType] = useState({ type_name: '', description: '' }); // For adding new types
  const [editType, setEditType] = useState(null); // For editing existing types
  const [error, setError] = useState(null); // To handle errors

  // Fetch animal types on component mount
  useEffect(() => {
    fetchAnimalTypes();
  }, []);

  // Function to fetch all animal types
  const fetchAnimalTypes = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/animal_types');
      const data = await response.json();
      setAnimalTypes(data);
    } catch (err) {
      setError('Failed to fetch animal types');
    }
  };

  // Handle sorting by animal type name
  const handleSort = () => {
    const sortedAnimalTypes = [...animalTypes].sort((a, b) => {
      const nameA = a.type_name.toLowerCase();
      const nameB = b.type_name.toLowerCase();
      return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
    setAnimalTypes(sortedAnimalTypes);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Handle searching by animal type name
  const filteredAnimalTypes = animalTypes.filter((type) =>
    type.type_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewType({ ...newType, [e.target.name]: e.target.value });
  };

  // Handle adding a new animal type (POST request)
  const handleAddType = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/animal_types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newType),
      });
      if (response.ok) {
        fetchAnimalTypes(); // Refresh the list after adding
        setNewType({ type_name: '', description: '' }); // Clear the form
      } else {
        setError('Failed to add animal type');
      }
    } catch (err) {
      setError('Failed to add animal type');
    }
  };

  // Handle editing an existing animal type (PUT request)
  const handleUpdateType = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:5000/animal_types/${editType.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editType),
      });
      if (response.ok) {
        fetchAnimalTypes(); // Refresh the list
        setEditType(null); // Exit edit mode
      } else {
        setError('Failed to update animal type');
      }
    } catch (err) {
      setError('Failed to update animal type');
    }
  };

  // Handle deleting an animal type (DELETE request)
  const handleDeleteType = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/animal_types/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchAnimalTypes(); // Refresh the list
      } else {
        setError('Failed to delete animal type');
      }
    } catch (err) {
      setError('Failed to delete animal type');
    }
  };

  return (
    <div className="animal-type-container container mx-auto p-6">
      <h2 className="text-primary_1 font-black text-2xl mb-8">Animal Types</h2>

      {/* Search input */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by Animal Type"
        className="mb-4 shadow border rounded w-full py-2 px-3 text-gray-700"
      />

      {/* Sorting button */}
      <button onClick={handleSort} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Sort by Type Name ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
      </button>

      {/* Add new animal type form */}
      <form onSubmit={handleAddType} className="mt-6">
        <h3 className="text-primary_1 font-black text-2xl mb-8">Add New Animal Type</h3>
        <input
          type="text"
          name="type_name"
          value={newType.type_name}
          onChange={handleInputChange}
          placeholder="Type Name"
          className="mb-2 shadow border rounded w-full py-2 px-3 text-gray-700"
        />
        <input
          type="text"
          name="description"
          value={newType.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="mb-2 shadow border rounded w-full py-2 px-3 text-gray-700"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-2">
          Add Animal Type
        </button>
      </form>

      {/* Display the list of animal types */}
      <ul className="bg-green-100 shadow-md rounded px-6 py-4 mt-4">
        {filteredAnimalTypes.length > 0 ? (
          filteredAnimalTypes.map((type) => (
            <li key={type.id} className="border-b py-2">
              <h2 className="text-primary_1 font-black text-2xl mb-2">
                <strong>{type.type_name}</strong> - {type.description}
              </h2>
              <button onClick={() => setEditType(type)} className="text-blue-500 mr-4">
                Edit
              </button>
              <button onClick={() => handleDeleteType(type.id)} className="text-red-500">
                Delete
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-600">No animal types available.</p>
        )}
      </ul>

      {/* Edit animal type form */}
      {editType && (
        <form onSubmit={handleUpdateType} className="mt-6">
          <h3 className="text-primary_1 font-black text-2xl mb-8">Edit Animal Type</h3>
          <input
            type="text"
            name="type_name"
            value={editType.type_name}
            onChange={(e) => setEditType({ ...editType, type_name: e.target.value })}
            placeholder="Type Name"
            className="mb-2 shadow border rounded w-full py-2 px-3 text-gray-700"
          />
          <input
            type="text"
            name="description"
            value={editType.description}
            onChange={(e) => setEditType({ ...editType, description: e.target.value })}
            placeholder="Description"
            className="mb-2 shadow border rounded w-full py-2 px-3 text-gray-700"
          />
          <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded mt-2">
            Update Animal Type
          </button>
          <button onClick={() => setEditType(null)} className="bg-gray-500 text-white px-4 py-2 rounded mt-2 ml-4">
            Cancel
          </button>
        </form>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default AnimalTypeList;
