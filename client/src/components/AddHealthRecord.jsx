// src/components/AddHealthRecord.jsx
import React, { useState } from 'react';

const AddHealthRecord = () => {
  const [animalId, setAnimalId] = useState('');
  const [checkupDate, setCheckupDate] = useState('');
  const [treatment, setTreatment] = useState('');
  const [vetName, setVetName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const record = { animal_id: animalId, checkup_date: checkupDate, treatment, vet_name: vetName };
    fetch('/api/health_records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h2>Add Health Record</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Animal ID" value={animalId} onChange={(e) => setAnimalId(e.target.value)} required />
        <input type="date" placeholder="Checkup Date" value={checkupDate} onChange={(e) => setCheckupDate(e.target.value)} required />
        <input type="text" placeholder="Treatment" value={treatment} onChange={(e) => setTreatment(e.target.value)} required />
        <input type="text" placeholder="Vet Name" value={vetName} onChange={(e) => setVetName(e.target.value)} required />
        <button type="submit">Add Record</button>
      </form>
    </div>
  );
};

export default AddHealthRecord;
