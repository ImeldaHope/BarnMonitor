import React, { useEffect, useState } from 'react';
import { useAuth } from "../AuthContext";

const FarmerProfile = () => {
    const [farmer, setFarmer] = useState(null);
    const [error, setError] = useState(null);
    const { user } = useAuth(); // Access the authenticated user
    const farmerId = user?.id;
    useEffect(() => {
        const fetchFarmer = async () => {
            try {
                console.log('Fetching farmer with ID:', farmerId);
                const response = await fetch(`http://127.0.0.1:5000/farmers/${farmerId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Farmer data:', data);
                setFarmer(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchFarmer();
    }, [farmerId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!farmer) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{
            backgroundColor: '#F1F4F9',
            color: '#364145',
            padding: '40px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
            width: '600px',
            margin: '20px auto', // Added margin for better spacing
            marginLeft: '250px', // Adjust this to ensure it is not covered by the sidebar
            position: 'relative', // Ensures proper stacking context
            zIndex: 1, // Brings the profile to the front if necessary
        }}>
            <h2 className='font-extrabold text-primary_2 text-3xl text-center pt-5'>Farmer Profile</h2>
            <div className='flex flex-col '>
                <strong>Name:</strong> {farmer.name}            
                <strong>Email:</strong> {farmer.email}            
                <strong>Phone:</strong> {farmer.phone}            
                <strong>Address:</strong> {farmer.address}
            </div>
        </div>
    );
};

export default FarmerProfile;
