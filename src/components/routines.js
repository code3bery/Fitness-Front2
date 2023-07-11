import React, { useState, useEffect } from 'react';
import { getAllPublicRoutines, createRoutine } from '../api';
import SingleRoutine from './singelRoutine';

const Routines = ({ token,user }) => {
  console.log(user);
  const [routines, setRoutines] = useState([]);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    createRoutine( name, goal, isPublic );
    setRoutines(await getAllPublicRoutines());
    setName('');
    setGoal('');
    setIsPublic(true);
    check()
  };
  async function check() {
    setRoutines(await getAllPublicRoutines());
  }
  useEffect(() => {
    check();
  }, []);

  return (
    <>
      <h1>Routines</h1>

      <form onSubmit={handleSubmit} id="routines">
        <label htmlFor="title">Name: </label>
        <input type="text" name="name" onChange={(event) => setName(event.target.value)} value={name} />
        <br />
        <label htmlFor="goal">Goal: </label>
        <input type="text" name="goal" onChange={(event) => setGoal(event.target.value)} value={goal} />
        <br />
        <label htmlFor="public">Public: </label>
        <input type="checkbox" name="public" checked={isPublic} onChange={() => setIsPublic(!isPublic)} />
        <br />
        <button type="submit">Submit</button>
        <hr />
      </form>

      <section>
        {routines?.map((routine, i) => {
          return (
          <SingleRoutine key={i} user={user} token={token} routine={routine} check={check}/>
          );
        })}
      </section>
    </>
  );
};

export default Routines;
