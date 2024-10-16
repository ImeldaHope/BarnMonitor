// client/src/components/AddHealthRecord.jsx
import React, { useState } from 'react';

const AddHealthRecord = () => {
  const [animalId, setAnimalId] = useState('');
  const [checkupDate, setCheckupDate] = useState('');
  const [treatment, setTreatment] = useState('');
  const [vetName, setVetName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/health_records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        animal_id: animalId,
        checkup_date: checkupDate,
        treatment,
        vet_name: vetName,
      }),
    }).then(() => {
      alert('Health record added');
    });
  };

  return (
    <div>
      <h2>Add Health Record</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Animal ID"
          value={animalId}
          onChange={(e) => setAnimalId(e.target.value)}
        />
        <input
          type="date"
          value={checkupDate}
          onChange={(e) => setCheckupDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Treatment"
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
        />
        <input
          type="text"
          placeholder="Vet Name"
          value={vetName}
          onChange={(e) => setVetName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddHealthRecord;
