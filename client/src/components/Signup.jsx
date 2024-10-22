import React, { useState } from 'react';


const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState(''); // State for address
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:5000/signup', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, address, password }), // Include address in payload
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.message === 'Farmer signed up successfully!') {
          alert('Sign Up Successful');
          // Optionally, redirect or clear form
        } else {
          alert(data.error || 'An error occurred while signing up. Please try again.'); // Handle error message
        }
      })
      .catch((error) => {
        alert(error.message); // Handle fetch errors
      });
  };

  return (
    <div className="flex flex-col justify-center items-center ms-72">
      <h2 className="text-primary_1 text-3xl font-bold p-5">Sign Up</h2>
      <form onSubmit={handleSubmit} className="p-3 w-96">
        <label>
          <span className="block text-secondary_2 font-semibold mb-1">
            Name
          </span>
          <input
            type="text"
            placeholder="Enter name"
            className="className='border text-secondary_2 border-gray-300 rounded-lg p-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary_2 transition duration-200'"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <span className="block text-secondary_2 font-semibold mb-1">
            Email
          </span>
          <input
            type="email"
            placeholder="Enter email"
            className="className='border text-secondary_2 border-gray-300 rounded-lg p-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary_2 transition duration-200'"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span className="block text-secondary_2 font-semibold mb-1">
            Phone
          </span>
          <input
            type="text"
            placeholder="Enter phone"
            className="className='border text-secondary_2 border-gray-300 rounded-lg p-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary_2 transition duration-200'"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label>
          <span className="block text-secondary_2 font-semibold mb-1">
            Address
          </span>
          <input
            type="text"
            placeholder="Enter address"
            className="className='border text-secondary_2 border-gray-300 rounded-lg p-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary_2 transition duration-200'"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label>
          <span className="block text-secondary_2 font-semibold mb-1">
            Password
          </span>
          <input
            type="password"
            placeholder="Enter password"
            className="className='border text-secondary_2 border-gray-300 rounded-lg p-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary_2 transition duration-200'"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="p-3 font-bold text-white bg-primary_2 hover:bg-primary_2-dark rounded-lg transition duration-200 active:bg-gradient-to-r active:from-green-400 active:to-blue-500"
        >
          Sign Up
        </button>
      </form>
      <p className=''>
        Already have an account?<a href="/login" className='text-secondary_1 underline font-normal'>Login</a>
      </p>
    </div>
  );

}
export default  Signup;