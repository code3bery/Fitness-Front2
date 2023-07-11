import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { callAPI } from '../api';

const AddActivity = ({ token, fetchActivities }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const addActivity = async (event) => {
    event.preventDefault();
    setError(''); 

    try {
      const activity = await callAPI({
        path: '/activities',
        method: "post",
        token,
        body: {
          name,
          description
        }
      });
      console.log(activity)
      if (activity) {
        setName('');
        setDescription('');
        fetchActivities();  
        navigate('/activities');
      }
    } catch (error) {
      setError(error.message || 'Error! This activity may already exist.');
    }
  };

  return (
    <>
      <h2>Add a New Activity</h2>
      <form onSubmit={addActivity} id="addAnActivity">
        <label htmlFor="title">Name</label>
        <input
          type="text"
          name="name" 
          onChange={event => setName(event.target.value)}
          value={name}
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          onChange={event => setDescription(event.target.value)}
          value={description}
        />

        <button type="submit">Submit</button>
        {error && <p className="error-message">{error}</p>}
        <hr/>
      </form>
    </>
  );
};

export default AddActivity;

