import React, { useState, useEffect } from 'react';

const Feed = () => {
    const [animalId, setAnimalId] = useState('');
    const [feedType, setFeedType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');
    const [feedRecords, setFeedRecords] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const farmerId = 1; 

    useEffect(() => {
        fetchFeedRecords();
    }, [farmerId]);

    const fetchFeedRecords = () => {
        fetch(`http://127.0.0.1:5000/farmers/${farmerId}`)
            .then((response) => response.json())
            .then((data) => {
                const animalsWithFeedRecords = data.animals.filter(
                    (animal) => animal.feed_records && animal.feed_records.length > 0
                );

                // Flatten the feed records from all animals
                const allFeedRecords = animalsWithFeedRecords.flatMap((animal) =>
                    animal.feed_records.map((record) => ({
                        id: record.id,
                        animalName: animal.name,
                        feedType: record.feed_type,
                        quantity: record.quantity,
                        date: record.date,
                    }))
                );

                setFeedRecords(allFeedRecords);
            })
            .catch((error) => console.error('Error fetching data:', error));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedDate = new Date(date).toISOString().split('T')[0];
    
        const record = {
            animal_id: animalId,
            feed_type: feedType,
            quantity: parseInt(quantity, 10),
            date: formattedDate,
        };
    
        try {
            const response = await fetch('http://127.0.0.1:5000/feeds', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(record),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error('Failed to submit feed record: ' + errorData.message || 'Unknown error');
            }
    
            // Fetch the newly created record
            const newRecord = await response.json();

            // Update the feedRecords state with the newly added record
            setFeedRecords((prevRecords) => [
                ...prevRecords,
                {
                    id: newRecord.id, // Use the actual ID from the backend
                    animalName: animalId, // Assuming animalId corresponds to animal name, you might want to fetch the actual name
                    feedType: feedType,
                    quantity: record.quantity,
                    date: formattedDate,
                },
            ]);
    
            setSuccessMessage('Feed record added successfully!');
            setErrorMessage('');
            resetForm();
        } catch (error) {
            setErrorMessage('Failed to add feed record: ' + error.message);
            setSuccessMessage('');
        }
    };
    
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/feeds/${id}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                setFeedRecords(feedRecords.filter((record) => record.id !== id));
                console.log(`Feed with ID ${id} deleted successfully.`);
            } else {
                const errorMessage = await response.json();
                console.error('Failed to delete feed record:', errorMessage.message);
            }
        } catch (error) {
            console.error('Error deleting feed record:', error);
        }
    };
    
    const resetForm = () => {
        setAnimalId('');
        setFeedType('');
        setQuantity('');
        setDate('');
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="sidebar" style={{ width: '250px', backgroundColor: '#f1f4f9' }}>
                {/* Add your sidebar content here */}
            </div>

            {/* Main Content */}
            <div className="container mx-auto p-8 w-full" style={{ backgroundColor: '#F1F4F9', maxWidth: '1200px', marginLeft: '250px' }}>
                <h2 className="text-4xl font-bold mb-6" style={{ color: '#027217' }}>Feed Management</h2>

                {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
                {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

                <div className="flex flex-wrap justify-between">
                    {/* Form for adding feed */}
                    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-full md:w-1/2 lg:w-1/3">
                        <h3 className="text-3xl font-bold mb-4" style={{ color: '#027217' }}>Add Feed Record</h3>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="animal_id">Animal ID</label>
                            <input
                                type="text"
                                id="animal_id"
                                value={animalId}
                                onChange={(e) => setAnimalId(e.target.value)}
                                required
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-green-500 bg-white"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="feed_type">Feed Type</label>
                            <input
                                type="text"
                                id="feed_type"
                                value={feedType}
                                onChange={(e) => setFeedType(e.target.value)}
                                required
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-green-500 bg-white"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">Quantity (kg)</label>
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">Date</label>
                            <input
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-green-500 bg-white"
                            />
                        </div>

                        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition duration-200">Add Feed Record</button>
                    </form>

                    {/* Feed Records Table */}
                    <div className="w-full md:w-1/2 lg:w-2/3 bg-white shadow-lg rounded p-6 mb-4">
                        <h3 className="text-3xl font-bold mb-4" style={{ color: '#027217' }}>Feed Records</h3>
                        <table className="min-w-full bg-white border border-gray-200 shadow-lg">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="py-4 px-6 border-b text-left text-black text-lg">Animal Name</th>
                                    <th className="py-4 px-6 border-b text-left text-black text-lg">Feed Type</th>
                                    <th className="py-4 px-6 border-b text-left text-black text-lg">Quantity (kg)</th>
                                    <th className="py-4 px-6 border-b text-left text-black text-lg">Date</th>
                                    <th className="py-4 px-6 border-b text-left text-black text-lg">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feedRecords.map((record) => (
                                    <tr key={record.id}>
                                        <td className="py-4 px-6 border-b text-left text-black">{record.animalName}</td>
                                        <td className="py-4 px-6 border-b text-left text-black">{record.feedType}</td>
                                        <td className="py-4 px-6 border-b text-left text-black">{record.quantity}</td>
                                        <td className="py-4 px-6 border-b text-left text-black">{record.date}</td>
                                        <td className="py-4 px-6 border-b text-left text-black">
                                            <button
                                                onClick={() => handleDelete(record.id)}
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
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
        </div>
    );
};

export default Feed;
