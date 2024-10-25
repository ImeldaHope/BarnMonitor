import React, { useState, useEffect } from 'react';
import { useAuth } from "../AuthContext";

const Feed = () => {
    const [animalName, setAnimalName] = useState('');
    const [feedType, setFeedType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');
    const [feedRecords, setFeedRecords] = useState([]);
    const [animals, setAnimals] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { user } = useAuth();
    const farmerId = user?.id;

    useEffect(() => {
        fetchFeedRecords();
        fetchAnimals();
    }, [farmerId]);

    const fetchFeedRecords = () => {
        fetch(`https://barnmonitor.onrender.com/farmers/${farmerId}`)
            .then((response) => response.json())
            .then((data) => {
                const animalsWithFeedRecords = data.animals.filter(
                    (animal) => animal.feed_records && animal.feed_records.length > 0
                );

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

    const fetchAnimals = async () => {
        try {
            const response = await fetch('https://barnmonitor.onrender.com/animals');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setAnimals(data);
        } catch (error) {
            console.error('Error fetching animals:', error);
            setErrorMessage('Failed to fetch animals.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedDate = new Date(date).toISOString().split('T')[0];
        const animal = animals.find(animal => animal.name === animalName);
        const record = {
            animal_id: animal ? animal.id : null,
            feed_type: feedType,
            quantity: parseInt(quantity, 10),
            date: formattedDate,
        };

        try {
            const response = await fetch('https://barnmonitor.onrender.com/feeds', {
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

            const newRecord = await response.json();
            setFeedRecords((prevRecords) => [
                ...prevRecords,
                {
                    id: newRecord.id,
                    animalName: animalName,
                    feedType: record.feed_type,
                    quantity: record.quantity,
                    date: record.date,
                }
            ]);

            setSuccessMessage('Feed record added successfully!');
            setErrorMessage('');
            resetForm();
        } catch (error) {
            console.error('Error adding feed record:', error);
            setErrorMessage('Failed to add feed record: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://barnmonitor.onrender.com/feeds/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error('Failed to delete feed record: ' + errorData.message || 'Unknown error');
            }

            setFeedRecords(prevRecords => prevRecords.filter(record => record.id !== id));
            setSuccessMessage('Feed record deleted successfully!');
            setErrorMessage('');
        } catch (error) {
            console.error('Error deleting feed record:', error);
            setErrorMessage('Failed to delete feed record: ' + error.message);
        }
    };

    const resetForm = () => {
        setAnimalName('');
        setFeedType('');
        setQuantity('');
        setDate('');
        setSuccessMessage('');
        setErrorMessage('');
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col p-4 md:p-8 w-full max-w-screen-lg">
                <h2 className="font-extrabold text-primary_2 text-3xl pt-5">
                    Feed Management
                </h2>

                {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
                {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-full mt-5"
                >
                    <h3 className="font-bold text-primary_2 text-3xl pt-5">
                        Add Feed Record
                    </h3>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="animal_name">
                            Animal Name
                        </label>
                        <input
                            type="text"
                            id="animal_name"
                            value={animalName}
                            onChange={(e) => setAnimalName(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-green-500 bg-white"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="feed_type">
                            Feed Type
                        </label>
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                            Quantity (kg/litres)
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-green-500 bg-white"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-primary_2 text-gray-100 hover:bg-secondary_1 rounded-lg p-2 mt-4"
                    >
                        Add Feed Record
                    </button>
                </form>

                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b-2 border-gray-300">Animal Name</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300">Feed Type</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300">Quantity</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300">Date</th>
                            <th className="py-2 px-4 border-b-2 border-gray-300">Actions</th>
                        </tr>
                        <tr>
                            <th className="py-2 px-4 text-gray-600">Animal Name</th>
                            <th className="py-2 px-4 text-gray-600">Feed Type</th>
                            <th className="py-2 px-4 text-gray-600">Quantity (kg/Litres)</th>
                            <th className="py-2 px-4 text-gray-600">Date</th>
                            <th className="py-2 px-4 text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedRecords.map((record) => (
                            <tr key={record.id}>
                                <td className="px-6 py-4 text-black">{record.animalName}</td>
                                <td className="px-6 py-4 text-black">{record.feedType}</td>
                                <td className="px-6 py-4 text-black">{record.quantity}</td>
                                <td className="px-6 py-4 text-black">{record.date}</td>
                                <td className="px-6 py-4 text-black">
                                    <button
                                        onClick={() => handleDelete(record.id)}
                                        className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-700"
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

export default Feed;
