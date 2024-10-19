import React, { useState, useEffect } from 'react';

const AddHealthRecord = () => {
  const [animalId, setAnimalId] = useState('');
  const [checkupDate, setCheckupDate] = useState('');
  const [treatment, setTreatment] = useState('');
  const [vetName, setVetName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [healthRecords, setHealthRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [editMode, setEditMode] = useState(false);
  const [editRecordId, setEditRecordId] = useState(null);

  // Fetch health records from the API on component mount
  useEffect(() => {
    fetchHealthRecords();
  }, []);

  // Function to fetch health records (GET request)
  const fetchHealthRecords = () => {
    fetch('http://127.0.0.1:5000/health_records')
      .then((response) => response.json())
      .then((data) => setHealthRecords(data))
      .catch((error) => console.error('Error:', error));
  };

  // Handle form submission (POST or PUT request depending on edit mode)
  const handleSubmit = (e) => {
    e.preventDefault();
    const record = { animal_id: animalId, checkup_date: checkupDate, treatment, vet_name: vetName };

    if (editMode) {
      // Update existing record (PUT request)
      fetch(`http://127.0.0.1:5000/health_records/${editRecordId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      })
        .then((response) => response.json())
        .then(() => {
          setSuccessMessage('Health record updated successfully!');
          setEditMode(false);
          setEditRecordId(null);
          fetchHealthRecords();
        })
        .catch((error) => {
          console.error('Error:', error);
          setErrorMessage('Failed to update health record.');
        });
    } else {
      // Add new record (POST request)
      fetch('http://127.0.0.1:5000/health_records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      })
        .then((response) => response.json())
        .then(() => {
          setSuccessMessage('Health record added successfully!');
          fetchHealthRecords();
        })
        .catch((error) => {
          console.error('Error:', error);
          setErrorMessage('Failed to add health record.');
        });
    }

    // Clear form fields
    setAnimalId('');
    setCheckupDate('');
    setTreatment('');
    setVetName('');
  };

  // Handle deleting a health record (DELETE request)
  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:5000/health_records/${id}`, { method: 'DELETE' })
      .then((response) => response.ok && setHealthRecords(healthRecords.filter((record) => record.id !== id)))
      .catch((error) => console.error('Error:', error));
  };

  // Handle editing a health record
  const handleEdit = (record) => {
    setAnimalId(record.animal_id);
    setCheckupDate(record.checkup_date);
    setTreatment(record.treatment);
    setVetName(record.vet_name);
    setEditMode(true);
    setEditRecordId(record.id);
  };

  // Handle sorting health records by checkup date
  const handleSort = () => {
    const sortedRecords = [...healthRecords].sort((a, b) => {
      const dateA = new Date(a.checkup_date);
      const dateB = new Date(b.checkup_date);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setHealthRecords(sortedRecords);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Filter health records based on search term
  const filteredRecords = healthRecords.filter(
    (record) =>
      record.animal_id.toString().includes(searchTerm) || record.vet_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animal-type-container container mx-auto p-6">
      <h2 className="text-primary_1 font-black text-2xl mb-8">{editMode ? 'Edit Health Record' : 'Add Health Record'}</h2>

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
          {editMode ? 'Update Record' : 'Add Record'}
        </button>
      </form>

      <button onClick={handleSort} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Sort by Checkup Date ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
      </button>

      {successMessage && <p className="text-green-500 text-xs italic">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by Animal ID or Vet Name"
        className="mb-4 shadow border rounded w-full py-2 px-3 text-gray-700"
      />

      <table className="min-w-full bg-white shadow-md rounded mt-6">
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
          {filteredRecords.map((record) => (
            <tr className="text-primary_1 font-black text-2xl mb-8" key={record.id}>
              <td className="border px-4 py-2">{record.animal_id}</td>
              <td className="border px-4 py-2">{record.checkup_date}</td>
              <td className="border px-4 py-2">{record.treatment}</td>
              <td className="border px-4 py-2">{record.vet_name}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(record)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
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
  );
};

export default AddHealthRecord;
