import React, { useEffect, useState } from 'react';
import { createRoutine, getRoutinesByUsername, getUser } from '../api';
import { loginUser } from '../api';

//const result = await loginUser(credentials);

const myRoutines = ({ token }) => {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [routines, setRoutines] = useState([]);
  

  const eventHandler = async (event) => {
    event.preventDefault();
    console.log(`Name: ${name}, Goal: ${goal}`);
    const responseData = await createRoutine(name, goal, true );
    console.log('test ', responseData);
    updateRoutines();
  };

  const updateRoutines = async () => {
    const myInformation = await getUser(token);
    console.log('My Data: ', myInformation);
    console.log('User: ', myInformation.username);
    const routinesByUsername = await getRoutinesByUsername(
      token,
      myInformation.username
    );
    setRoutines(routinesByUsername);
  };

  useEffect(() => {
    updateRoutines();
  }, []);

  return (
    <>
      <h2>Create Routine</h2>
      <section className="main">
        <form onSubmit={eventHandler} id="Routines">
          <div className="List">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder=" Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="List">
            <textarea
              name="goal"
              id="goal"
              cols="100"
              rows="5"
              placeholder="Goals"
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
            ></textarea>
          </div>

          <input type="submit" value="Submit" className="mybutton" />
        </form>
      </section>

      <hr />

      <h2>My Routines</h2>
      <section>
        {routines?.map((routine, i) => {
          const { name, creatorName, goal, activities } = routine;

          return (
            <article key={i}>
              <h3>{name}</h3>
              <p>Creator: {creatorName}</p>
              <p>Goal: {goal}</p>
              <ul>
                {activities?.map((activity, i) => {
                  const { name, description, count, duration } = activity;

                  return (
                    <li key={i}>
                      {name}
                      <ol>
                        <li>Description: {description}</li>
                        <li>Count: {count}</li>
                        <li>Duration: {duration}</li>
                      </ol>
                    </li>
                  );
                })}
              </ul>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default myRoutines;
