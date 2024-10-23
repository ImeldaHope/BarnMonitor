import React, { useState } from 'react';
import logo from '../assets/barnmonitor-logo.svg';
import {useAuth} from '../AuthContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState(''); 
  const [password, setPassword] = useState('');

  const auth = useAuth();
  
  const handleSubmit = (e) => {   

    e.preventDefault();

    const input = {email:email, password:password, name:name, address:address, phone:phone}
    if (input.email !== "" && input.password !== "") {
      auth.handleSignUp(input);
      return;
    }     
  };

  return (
    <div className="flex flex-col justify-center items-center ms-60">
      <div className='flex items-center justify-center'>
      <img
          src={logo}
          alt="barn-monitor-logo"
          className="w-1/3 h-1/3 max-w-xs max-h-xs"
        /> 
      </div>
      <h2 className="text-primary_1 text-3xl font-bold mt-3">Sign Up</h2>
      <form onSubmit={handleSubmit} className="w-96">
        <label className="flex items-center my-5">
          <span className="block text-secondary_2 font-semibold m-3">
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
        <label className="flex items-center my-5">
          <span className="block text-secondary_2 font-semibold m-3">
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
        <label className="flex items-center my-5">
          <span className="block text-secondary_2 font-semibold m-3">
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
        <label className="flex items-center my-5">
          <span className="block text-secondary_2 font-semibold m-3">
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
        <label className="flex items-center my-5">
          <span className="block text-secondary_2 font-semibold m-3">
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
          className="p-3 font-bold w-full text-white bg-primary_2 hover:bg-primary_2-dark rounded-lg transition duration-200 active:bg-gradient-to-r active:from-green-400 active:to-blue-500"
        >
          Sign Up
        </button>
      </form>
      <p className='text-secondary_2'>
        Already have an account?<a href="/login" className='text-secondary_1 underline font-normal visited:text-purple-600'>Login</a>
      </p>
    </div>
  );

}
export default  Signup;