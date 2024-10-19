// src/components/AddHealthRecord.jsx
import React, { useState, useEffect } from 'react';

const AddHealthRecord = () => {
  const [animalId, setAnimalId] = useState('');
  const [checkupDate, setCheckupDate] = useState('');
  const [treatment, setTreatment] = useState('');
  const [vetName, setVetName] = useState('');
  const [healthRecords, setHealthRecords] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editRecordId, setEditRecordId] = useState(null);

  // Fetch health records on component mount
  useEffect(() => {
    fetch('http://127.0.0.1:5000/health_records')
      .then(response => response.json())
      .then(data => setHealthRecords(data));
  }, []);

  // Handle form submission (create/update health record)
  const handleSubmit = (e) => {
    e.preventDefault();
    const record = { animal_id: animalId, checkup_date: checkupDate, treatment, vet_name: vetName };
    
    if (editMode) {
      fetch(`http://127.0.0.1:5000/health_records/${editRecordId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      })
      .then(response => response.json())
      .then(data => {
        setHealthRecords(healthRecords.map(rec => rec.id === editRecordId ? data : rec));
        setEditMode(false);
        setAnimalId(''); setCheckupDate(''); setTreatment(''); setVetName('');
      });
    } else {
      fetch('http://127.0.0.1:5000/health_records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      })
      .then(response => response.json())
      .then(newRecord => setHealthRecords([...healthRecords, newRecord]));
    }
  };

  // Handle delete
  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:5000/health_records/${id}`, { method: 'DELETE' })
      .then(() => setHealthRecords(healthRecords.filter(record => record.id !== id)));
  };

  // Handle edit
  const handleEdit = (record) => {
    setEditMode(true);
    setEditRecordId(record.id);
    setAnimalId(record.animal_id);
    setCheckupDate(record.checkup_date);
    setTreatment(record.treatment);
    setVetName(record.vet_name);
  };

  return (
    <div>
      <h2>{editMode ? 'Edit Health Record' : 'Add Health Record'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={animalId} onChange={(e) => setAnimalId(e.target.value)} placeholder="Animal ID" required />
        <input type="date" value={checkupDate} onChange={(e) => setCheckupDate(e.target.value)} required />
        <input type="text" value={treatment} onChange={(e) => setTreatment(e.target.value)} placeholder="Treatment" required />
        <input type="text" value={vetName} onChange={(e) => setVetName(e.target.value)} placeholder="Vet Name" required />
        <button type="submit">{editMode ? 'Update' : 'Add'}</button>
      </form>
      <ul>
        {healthRecords.map(record => (
          <li key={record.id}>
            {record.treatment} (Vet: {record.vet_name}) 
            <button onClick={() => handleEdit(record)}>Edit</button>
            <button onClick={() => handleDelete(record.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddHealthRecord;
