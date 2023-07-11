import React, { useState } from 'react';
import { loginUser } from '../api';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); 
    try {
      const response = await loginUser(username, password);
      if (response.token) {
        setToken(response.token);
        navigate('/');
      } else {
        setError('Invalid username or password. Please try again.');
      }
    } catch (error) {
      setError('An error occurred during login. Please try again.');
    }
  };

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
