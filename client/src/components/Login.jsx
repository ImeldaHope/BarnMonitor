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
          className='border mb-5 text-secondary_2 border-gray-300 rounded-lg p-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary_2 transition duration-200'
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='border mb-5 text-secondary_2 border-gray-300 rounded-lg p-2 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary_2 transition duration-200'
        />
        <button type="submit" className="p-3 font-bold w-full text-white bg-primary_2 hover:bg-primary_2-dark rounded-lg transition duration-200 active:bg-gradient-to-r active:from-green-400 active:to-blue-500">Login</button>
      </form>
      <p className='text-secondary_2'>
        Don't have an account?<a href="/signup" className='text-secondary_1 underline font-normal'>Sign up</a>
      </p>
    </div>
  );
};


export default Login;
