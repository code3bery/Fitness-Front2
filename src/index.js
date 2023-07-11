import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import { callAPI, getUser, loginUser as login } from './api';

import Home from './components/home';
import ViewActivities from './components/viewactivities';
import Register from './components/register';
import Login from './components/login';
import AddActivity from './components/addActivity';
import Routines from './components/routines';
import MyRoutines from './components/myRoutines';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ?? '');
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  const getActivities = async () => {
    const data = await callAPI({
      path: '/activities',
      token,
    });

    if (data?.activities) {
      setActivities(data.activities);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(token);
        
        if (response) {
          setUser(response);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
    getActivities();
  }, [token]);

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  const handleLogout = () => {
    setToken('');
    setUser(null);
  };

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/activities">Activities</Link>
          <Link to="/routines">Routines</Link>
          <Link to="/myroutines">My Routines</Link>
          {token && <button onClick={handleLogout}>Logout</button>}
        </nav>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route
            path="/activities"
            element={<ViewActivities activities={activities} error={error} setError={setError} token={token}/>}
          />
          {!token ? (
            <Route path="/users/register" element={<Register setToken={setToken} />} />
          ) : null}
          {!token && (
            <Route
              path="/users/login"
              element={<Login login={login} setToken={setToken} token={token} setUser={setUser} />}
            />
          )}

          <Route
            path="/addActivity"
            element={<AddActivity token={token} />}
          />
          <Route
            path="/routines"
            element={<Routines token={token} activities={activities} error={error} setError={setError} user={user}/>}
          />
          <Route
            path="/myroutines"
            element={<MyRoutines token={token} activities={activities} error={error} setError={setError} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

const root = createRoot(document.getElementById("app"));
root.render(<App />)
