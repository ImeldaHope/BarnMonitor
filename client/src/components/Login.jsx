// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/type.css'

const Login = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple validation
    if (mobile === '1234567890' && password === 'password') {
      // Set session
      sessionStorage.setItem('auth', 'true');
      navigate('/dashboard'); // Assuming dashboard is the main page after login
    } else {
      alert('Invalid mobile number or password');
    }
  };

  return (
    <div className="login-container">
      <h2 className='text-primary_1 text-2xl font-bold'>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" back>Login</button>
      </form>
      <p>
        New here? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

export default Login;
