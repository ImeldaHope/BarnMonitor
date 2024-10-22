import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState(''); // Change state variable to email
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email, // Use the email as the username
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Assuming your API sends back a success message or user data
        sessionStorage.setItem('auth', 'true');
        navigate('/dashboard'); // Redirect to the dashboard
      } else {
        alert(data.error || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginContainer}>
        <h2 style={styles.header}>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email" // Change type to email
            placeholder="Email Address" // Update placeholder
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p style={styles.text}>
          New here? <a href="/signup">Sign up</a>
        </p>
      </div>
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
