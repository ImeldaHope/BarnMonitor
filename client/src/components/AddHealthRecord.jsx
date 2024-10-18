// src/components/AddHealthRecord.jsx
import React, { useState, useEffect } from 'react';

const AddHealthRecord = () => {
  const [animalId, setAnimalId] = useState('');
  const [checkupDate, setCheckupDate] = useState('');
  const [treatment, setTreatment] = useState('');
  const [vetName, setVetName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [healthRecords, setHealthRecords] = useState([]);

  // Fetch the list of health records after a successful submission
  const fetchHealthRecords = () => {
    fetch('/api/health_records')
      .then((res) => res.json())
      .then((data) => setHealthRecords(data))
      .catch((error) => console.error('Error:', error));
  };

  useEffect(() => {
    fetchHealthRecords(); // Fetch the list on component mount
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const record = { animal_id: animalId, checkup_date: checkupDate, treatment, vet_name: vetName };
    
    console.log("Sending record:", record);  // Log data before sending
  
    fetch('/api/health_records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Failed to submit health record");
    })
    .then((data) => {
      setSuccessMessage('Health record added successfully!');
      setErrorMessage('');
      fetchHealthRecords(); // Refresh the list of health records
    })
    .catch((error) => {
      console.error('Error:', error);
      setErrorMessage('Failed to add health record.');
      setSuccessMessage('');
    });
  };
  
  // Handle delete functionality
  const handleDelete = (id) => {
    fetch(`/api/health_records/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setHealthRecords(healthRecords.filter((record) => record.id !== id)); // Update the state
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-primary_1 font-black text-2xl mb-8">Add Health Record</h2>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="animal_id">
            Animal ID
          </label>
          <input
            type="text"
            id="animal_id"
            value={animalId}
            onChange={(e) => setAnimalId(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="checkup_date">
            Checkup Date
          </label>
          <input
            type="date"
            id="checkup_date"
            value={checkupDate}
            onChange={(e) => setCheckupDate(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="treatment">
            Treatment
          </label>
          <input
            type="text"
            id="treatment"
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vet_name">
            Vet Name
          </label>
          <input
            type="text"
            id="vet_name"
            value={vetName}
            onChange={(e) => setVetName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Record
        </button>
      </form>

      {successMessage && <p className="text-green-500 text-xs italic">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}

      <h2 className="text-primary_1 font-black text-2xl mb-8">Health Records</h2>
      <table className="min-w-full bg-white shadow-md rounded mt-6" >
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200">Animal ID</th>
            <th className="py-2 px-4 bg-gray-200">Checkup Date</th>
            <th className="py-2 px-4 bg-gray-200">Treatment</th>
            <th className="py-2 px-4 bg-gray-200">Vet Name</th>
            <th className="py-2 px-4 bg-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {healthRecords.map((record) => (
            <tr key={record.id}>
              <td className="py-2 px-4">{record.animal_id}</td>
              <td className="py-2 px-4">{record.checkup_date}</td>
              <td className="py-2 px-4">{record.treatment}</td>
              <td className="py-2 px-4">{record.vet_name}</td>
              <td className="py-2 px-4">
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
  );
};

export default AddHealthRecord;
