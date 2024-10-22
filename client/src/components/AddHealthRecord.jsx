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

  const farmerId = 1;

  const fetchHealthRecords = () => {
    fetch(`http://127.0.0.1:5000/farmers/${farmerId}`)
      .then((response) => response.json())
      .then((data) => {
        const record_data = data.animals.flatMap((animal) => animal.health_records);
        setHealthRecords(record_data);
      })
      .catch((error) => console.error('Error fetching health records:', error));
  };

  useEffect(() => {
    if (farmerId) {
      fetchHealthRecords();
    }
  }, [farmerId]);

  // Handle form submission for adding or updating health records
  const handleSubmit = (e) => {
    e.preventDefault();

    const record = {
      animal_id: animalId,
      checkup_date: checkupDate,
      treatment,
      vet_name: vetName,
      farmer_id: farmerId, // Ensure farmerId is included
    };

    const requestMethod = editMode ? 'PATCH' : 'POST';
    const url = editMode
      ? `http://127.0.0.1:5000/health_records/${editRecordId}`
      : 'http://127.0.0.1:5000/health_records';

    fetch(url, {
      method: requestMethod,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    })
      .then((response) => response.json())
      .then(() => {
        setSuccessMessage(
          editMode ? 'Health record updated successfully!' : 'Health record added successfully!'
        );
        setEditMode(false);
        setEditRecordId(null);
        fetchHealthRecords();
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage(editMode ? 'Failed to update health record.' : 'Failed to add health record.');
      });

    // Clear form fields
    setAnimalId('');
    setCheckupDate('');
    setTreatment('');
    setVetName('');
  };

  // Handle deleting a health record (DELETE request)
  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:5000/health_records/${id}`, { method: 'DELETE' })
      .then((response) =>
        response.ok && setHealthRecords(healthRecords.filter((record) => record.id !== id))
      )
      .catch((error) => console.error('Error deleting health record:', error));
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

  return (
    <div className="animal-type-container container mx-auto p-6">
      <h2 className="text-primary_1 font-black text-2xl mb-8">
        {editMode ? 'Edit Health Record' : 'Add Health Record'}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-row justify-between items-center gap-6 p-4 bg-gray-100 shadow-lg rounded-lg w-full my-10"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="animal_id">
            <span className="block text-secondary_1 font-semibold mb-1">Animal ID</span>
          </label>
          <input
            type="text"
            id="animal_id"
            value={animalId}
            onChange={(e) => setAnimalId(e.target.value)}
            required
            className="border text-secondary_2 border-gray-300 rounded-lg p-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary_2 transition duration-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="checkup_date">
            <span className="block text-secondary_1 font-semibold mb-1">Checkup Date</span>
          </label>
          <input
            type="date"
            id="checkup_date"
            value={checkupDate}
            onChange={(e) => setCheckupDate(e.target.value)}
            required
            className="border text-secondary_2 border-gray-300 rounded-lg p-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary_2 transition duration-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="treatment">
            <span className="block text-secondary_1 font-semibold mb-1">Treatment</span>
          </label>
          <input
            type="text"
            id="treatment"
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
            required
            className="border text-secondary_2 border-gray-300 rounded-lg p-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary_2 transition duration-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vet_name">
            <span className="block text-secondary_1 font-semibold mb-1">Vet Name</span>
          </label>
          <input
            type="text"
            id="vet_name"
            value={vetName}
            onChange={(e) => setVetName(e.target.value)}
            required
            className="border text-secondary_2 border-gray-300 rounded-lg p-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary_2 transition duration-200"
          />
        </div>

        <button
          type="submit"
          className="p-3 font-bold text-white bg-primary_2 hover:bg-primary_2-dark rounded-lg transition duration-200"
        >
          {editMode ? 'Update Record' : 'Add Record'}
        </button>
      </form>

      <button
        onClick={handleSort}
        className="p-3 font-bold text-white bg-primary_2 hover:bg-primary_2-dark rounded-lg transition duration-200 mb-4"
      >
        Sort by Checkup Date ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
      </button>

      {successMessage && <p className="text-green-500 text-xs italic mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>}

      <div>
        <input
          type="text"
          placeholder="Search by Animal ID or Vet Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border text-secondary_2 border-gray-300 rounded-lg p-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary_2 transition duration-200"
        />
      </div>

      <table className="table-auto w-full my-6">
        <thead>
          <tr className="bg-gray-200 text-secondary_2">
            <th className="px-4 py-2">Animal ID</th>
            <th className="px-4 py-2">Treatment</th>
            <th className="px-4 py-2">Vet</th>
            <th className="px-4 py-2">Checkup Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {healthRecords.map((record) => (
                        <tr key={record.id} className="text-secondary_2 bg-gray-50 hover:bg-gray-100">
              <td className="border px-4 py-2">{record.animal_id}</td>
              <td className="border px-4 py-2">{record.treatment}</td>
              <td className="border px-4 py-2">{record.vet_name}</td>
              <td className="border px-4 py-2">{record.checkup_date}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(record)}
                  className="p-2 mx-2 text-primary_1 bg-secondary_1 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(record.id)}
                  className="p-2 text-red-500 bg-gray-100 rounded-lg"
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

// IMPRESSED