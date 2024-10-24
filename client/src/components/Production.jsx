import React, { useState, useEffect } from 'react';
import { useAuth } from "../AuthContext";

const Production = () => {
  const [animalId, setAnimalId] = useState('');
  const [productType, setProductType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [productionDate, setProductionDate] = useState('');
  const [productionRecords, setProductionRecords] = useState([]);
  const [animals, setAnimals] = useState([]); // New state for animals
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentRecordId, setCurrentRecordId] = useState(null);

  const { user } = useAuth(); // Access the authenticated user
  const farmerId = user?.id;

  useEffect(() => {
    fetchProductionRecords();
    fetchAnimals(); // Fetch animals when the component mounts
  }, []);

  const fetchProductionRecords = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/productions');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      const filteredProduction = data.filter((produce) => produce.animal.farmer_id === farmerId);
      setProductionRecords(filteredProduction);
    } catch (error) {
      console.error('Error fetching production records:', error);
      setErrorMessage('Failed to fetch production records.');
    }
  };

  const fetchAnimals = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/animals'); // Update this endpoint accordingly
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setAnimals(data); // Assuming data is an array of animals with id and name
    } catch (error) {
      console.error('Error fetching animals:', error);
      setErrorMessage('Failed to fetch animals.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedProductionDate = new Date(productionDate).toISOString().split('T')[0];
    const record = {
      animal_id: animalId, // This will now use the selected animal ID
      product_type: productType,
      quantity: parseInt(quantity, 10),
      production_date: formattedProductionDate,
    };

    try {
      const response = await fetch(currentRecordId ? `http://127.0.0.1:5000/productions/${currentRecordId}` : 'http://127.0.0.1:5000/productions', {
        method: currentRecordId ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to submit production record: ${errorData.message || response.statusText}`);
      }

      setSuccessMessage(currentRecordId ? 'Production record updated successfully!' : 'Production record added successfully!');
      setErrorMessage('');
      fetchProductionRecords(); // Refresh the records after submission
      resetForm();
    } catch (error) {
      console.error('Error adding/updating production record:', error);
      setErrorMessage('Failed to add/update production record: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/productions/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProductionRecords(productionRecords.filter((record) => record.id !== id));
      } else {
        const errorData = await response.json();
        throw new Error(`Failed to delete production record: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting production record:', error);
      setErrorMessage('Failed to delete production record: ' + error.message);
    }
  };

  const handleEdit = (record) => {
    setAnimalId(record.animal_id);
    setProductType(record.product_type);
    setQuantity(record.quantity);
    setProductionDate(record.production_date);
    setCurrentRecordId(record.id);
  };

  const resetForm = () => {
    setAnimalId('');
    setProductType('');
    setQuantity('');
    setProductionDate('');
    setCurrentRecordId(null);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const getAnimalNameById = (id) => {
    const animal = animals.find((animal) => animal.id === id);
    return animal ? animal.name : 'Unknown Animal'; // Return the name if found, else a placeholder
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col p-4 md:p-8 w-full max-w-screen-lg">
        <h2 className="font-extrabold text-primary_2 text-3xl pt-5">
          Production Management
        </h2>
  
        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
  
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-full mt-5"
        >
          <h3 className="font-bold text-primary_2 text-3xl pt-5">
            {currentRecordId ? 'Update Production Record' : 'Add Production Record'}
          </h3>
  
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="animal_id">
              Animal Name
            </label>
            <select
  id="animal_id"
  value={animalId}
  onChange={(e) => setAnimalId(e.target.value)}
  required
  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-green-500 bg-white"
>
  <option value="" disabled>Select an animal</option>
  {animals
    .filter(animal => animal.farmer_id === farmerId) // Filter animals by farmerId
    .map(animal => (
      <option key={animal.id} value={animal.id}>
        {animal.name}
      </option>
    ))}
</select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product_type">
              Product Type
            </label>
            <input
              type="text"
              id="product_type"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-green-500 bg-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
              Quantity (kg/Litres)
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-green-500 bg-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="production_date">
              Production Date
            </label>
            <input
              type="date"
              id="production_date"
              value={productionDate}
              onChange={(e) => setProductionDate(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-green-500 bg-white"
            />
          </div>
          <button
            type="submit"
            className="bg-primary_2 text-gray-100 hover:bg-secondary_1 rounded-lg p-2 text-xl"
          >
            {currentRecordId ? 'Update' : 'Add'} Production Record
          </button>
        </form>
  
        <div className="bg-white shadow-lg rounded p-6 mb-4 w-full overflow-auto">
          <h3 className="text-3xl font-bold mb-4" style={{ color: '#027217' }}>
            Production Records
          </h3>
          <table className="min-w-full">
            <thead>
              <tr className="bg-primary_1 text-white">
                <th className="px-6 py-3 text-left">Animal Name</th> {/* Changed to 'Animal' */}
                <th className="px-6 py-3 text-left">Product Type</th>
                <th className="px-6 py-3 text-left">Quantity (kg/Litres)</th>
                <th className="px-6 py-3 text-left">Production Date</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productionRecords.map((record) => (
                <tr key={record.id} className="border-b">
                  <td className="px-6 py-4 text-black">{getAnimalNameById(record.animal_id)}</td> {/* Use the animal name */}
                  <td className="px-6 py-4 text-black">{record.product_type}</td>
                  <td className="px-6 py-4 text-black">{record.quantity}</td>
                  <td className="px-6 py-4 text-black">{record.production_date}</td>
                  <td className="px-6 py-4 text-black">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => handleEdit(record)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
                      onClick={() => handleDelete(record.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Production;
