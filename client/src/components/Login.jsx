// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/type.css'

const Login = ({onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const navigate = useNavigate();

  const handleLogin = (e) => {
    console.log("I have been called")
    e.preventDefault();

    fetch("http://127.0.0.1:5000/login", {
      method: "POST",      
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({ email, password}),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            console.log("I am the response user", user)
            navigate("/dashboard")
            onLogin(user)});
        } else {
          console.log("Log in fail")
          throw new Error('Login failed');
        }
      })   

    
  };

  return (
    <div className="flex flex-col justify-center items-center ms-72">
      <h2 className='text-primary_1 text-3xl font-bold p-5'>Login</h2>
      <form onSubmit={handleLogin} className='p-3 w-96'>
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

export default Login;
