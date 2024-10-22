// src/components/Login.jsx
import React, { useState, useEffect } from 'react';
import {useAuth} from '../AuthContext'


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const auth = useAuth();
  
  const handleSubmit = (e) => {
    
    e.preventDefault();
    const input = {email:email, password:password}
    if (input.email !== "" && input.password !== "") {
      auth.handleLogin(input);
      return;
    }
    alert("please provide a valid input");   

    
  };

  return (
    <div className="flex flex-col justify-center items-center ms-72">
      <h2 className='text-primary_1 text-3xl font-bold p-5'>Login</h2>
      <form onSubmit={handleSubmit} className='p-3 w-96'>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='border text-secondary_2 border-gray-300 rounded-lg p-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary_2 transition duration-200'
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='border text-secondary_2 border-gray-300 rounded-lg p-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary_2 transition duration-200'
        />
        <button type="submit" className="p-3 font-bold text-white bg-primary_2 hover:bg-primary_2-dark rounded-lg transition duration-200 active:bg-gradient-to-r active:from-green-400 active:to-blue-500">Login</button>
      </form>
      <p className=''>
        Don't have an account?<a href="/signup" className='text-secondary_1 underline font-normal'>Sign up</a>
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center',
    height: '100vh', // Full viewport height
    paddingLeft: '300px', // Increase this value to push further right (adjust as needed)
    backgroundColor: '#f1f4f9', // Optional background color
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Optional shadow for depth
    backgroundColor: 'white', // White background for the login form
    width: '300px', // Fixed width for the login form
    marginLeft: 'auto', // Pushes it to the right if necessary
    marginRight: 'auto', // Ensures it's centered
  },
  header: {
    color: '#027217', // Primary color
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  input: {
    margin: '10px 0',
    padding: '10px',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%', // Full width for the button
  },
  text: {
    marginTop: '20px',
  },
};

export default Login;
