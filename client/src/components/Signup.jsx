import React, { useState } from 'react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, phone, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Farmer signed up successfully!') {
          alert('Sign Up Successful');
        } else {
          alert(data.message);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-farmGreen text-white rounded-lg">
  <input
    type="text"
    placeholder="Name"
    className="mb-4 p-2 rounded bg-white text-black"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
  <input
    type="email"
    placeholder="Email"
    className="mb-4 p-2 rounded bg-white text-black"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  <input
    type="text"
    placeholder="Phone"
    className="mb-4 p-2 rounded bg-white text-black"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
  />
  <input
    type="password"
    placeholder="Password"
    className="mb-4 p-2 rounded bg-white text-black"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <button type="submit" className="p-2 bg-farmBrown text-white rounded">
    Sign Up
  </button>
</form>

  );
};

export default Signup;
