import React, { useState, useEffect } from 'react';
import { useAuth } from "../AuthContext";

const Sales = () => {
  const [animalId, setAnimalId] = useState('');
  const [productType, setProductType] = useState('');
  const [quantitySold, setQuantitySold] = useState('');
  const [amount, setAmount] = useState('');
  const [saleDate, setSaleDate] = useState('');
  const [salesRecords, setSalesRecords] = useState([]);
  const [animals, setAnimals] = useState([]); 
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentRecordId, setCurrentRecordId] = useState(null);
  
  const { user } = useAuth(); // Access the authenticated user
  const farmerId = user?.id;

  useEffect(() => {
    fetchSalesRecords();
    fetchAnimals(); // Fetch animals when the component mounts
  }, [farmerId]); // Re-run if farmerId changes

  const fetchSalesRecords = async () => {
    try {
      const response = await fetch('https://barnmonitor.onrender.com/sales');
      if (!response.ok) throw new Error('Network response was not ok');
      const salesData = await response.json();
      // Include the animals data in the sales records
      const filteredSales = salesData.filter((sale) => sale.animal.farmer_id === farmerId);
      setSalesRecords(filteredSales);
    } catch (error) {
      console.error('Error fetching sales records:', error);
      setErrorMessage('Failed to fetch sales records.');
    }
  };

  const fetchAnimals = async () => {
    try {
      const response = await fetch('https://barnmonitor.onrender.com/animals'); // Ensure this endpoint returns all animals
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

    const record = {
      animal_id: animalId,
      product_type: productType,
      quantity_sold: parseInt(quantitySold, 10),
      amount: parseFloat(amount),
      sale_date: new Date(saleDate).toISOString().split('T')[0],
    };

    try {
      const response = await fetch(`https://barnmonitor.onrender.com/sales${currentRecordId ? `/${currentRecordId}` : ''}`, {
        method: currentRecordId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to submit sales record: ${errorData.message || response.statusText}`);
      }

      // Use the response to get the updated record
      const newRecord = await response.json();

      if (currentRecordId) {
        // Update the existing record
        setSalesRecords(salesRecords.map((sale) =>
          sale.id === currentRecordId ? { ...newRecord } : sale
        ));
        setSuccessMessage('Sales record updated successfully!');
      } else {
        // Add the new record
        setSalesRecords([...salesRecords, newRecord]); // Add newRecord directly
        setSuccessMessage('Sales record added successfully!');
      }

      setErrorMessage('');
      resetForm();
      fetchSalesRecords(); // Optionally refetch sales records to ensure freshness
    } catch (error) {
      console.error('Error adding/updating sales record:', error);
      setErrorMessage(' ' + error.message);
      setSuccessMessage('');
    }
};

  

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://barnmonitor.onrender.com/sales/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSalesRecords(salesRecords.filter((record) => record.id !== id));
      } else {
        const errorData = await response.json();
        throw new Error(`Failed to delete sales record: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting sales record:', error);
      setErrorMessage('Failed to delete sales record: ' + error.message);
    }
  };

  const handleEdit = (record) => {
    setAnimalId(record.animal_id);
    setProductType(record.product_type);
    setQuantitySold(record.quantity_sold);
    setAmount(record.amount);
    setSaleDate(record.sale_date);
    setCurrentRecordId(record.id);
  
  };

  const resetForm = () => {
    setAnimalId('');
    setProductType('');
    setQuantitySold('');
    setAmount('');
    setSaleDate('');
    setCurrentRecordId(null);
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col p-4 md:p-8 w-full max-w-screen-lg">
        <h2 className="font-extrabold text-primary_2 text-3xl pt-5">
          Sales Management
        </h2>
  
        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
  
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-full mt-5"
        >
          <h3 className="font-bold text-primary_2 text-3xl pt-5">
            {currentRecordId ? 'Update Sales Record' : 'Add Sales Record'}
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
  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-green-500 bg-white">
  <option value="" disabled>Select an animal</option>
  {animals.filter(animal => animal.farmer_id === farmerId) // Filter animals by farmerId
    .map(animal => (
    <option key={animal.id} value={animal.id}>{animal.name}</option>
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity_sold">
              Quantity Sold (kg/Litres)
            </label>
            <input
              type="number"
              id="quantity_sold"
              value={quantitySold}
              onChange={(e) => setQuantitySold(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-green-500 bg-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
              Amount (Ksh)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-green-500 bg-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sale_date">
              Sale Date
            </label>
            <input
              type="date"
              id="sale_date"
              value={saleDate}
              onChange={(e) => setSaleDate(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-green-500 bg-white"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-primary_2 text-gray-100 hover:bg-secondary_1 rounded-lg p-2 text-xl"
            >
              {currentRecordId ? 'Update Record' : 'Add Record'}
            </button>
          </div>
        </form>
  
        <h3 className="font-bold text-primary_2 text-2xl">Sales Records</h3>
        <table className="min-w-full">
          <thead>
          <tr className="bg-primary_1 text-white">
              <th className="px-6 py-3 text-left">Animal Name</th>
              <th className="px-6 py-3 text-left">Product Type</th>
              <th className="px-6 py-3 text-left">Quantity Sold(kg/Litres)</th>
              <th className="px-6 py-3 text-left">Amount(Ksh)</th>
              <th className="px-6 py-3 text-left">Sale Date</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {salesRecords.map((record) => (
              <tr key={record.id}className="border-b">
                <td className="px-6 py-4 text-black">{record.animal?.name}</td>
                <td className="px-6 py-4 text-black">{record.product_type}</td>
                <td className="px-6 py-4 text-black">{record.quantity_sold} </td>
                <td className="px-6 py-4 text-black"> {record.amount.toFixed(2)}</td>
                <td className="px-6 py-4 text-black">{new Date(record.sale_date).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-black">
                  <button
                    onClick={() => handleEdit(record)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(record.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
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
  );
};

export default Sales;