import React from 'react'
import { updateRoutine } from '../api'
import {useState} from 'react'
import EditRoutine from './editRoutine';
import { deleteRoutine } from '../api';

const SingleRoutine = ({user,routine,check,token}) => { 
    const { name, creatorName, goal, activities } = routine;
    const [updateForm, setUpdateForm] = useState (false);
    return  <article>
    <h2>{name}</h2>
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
    {user && creatorName === user.username && <button onClick={()=>setUpdateForm(!updateForm)}>Update</button>}
    {user && updateForm && <EditRoutine setUpdateForm={setUpdateForm} token={token} routine ={routine} check={check}/>}
    {user && creatorName === user.username && <button onClick={async ()=>{
        await deleteRoutine(token,routine.id)
        await check()
        }}>Delete</button>}
  </article>
  
}

export default SingleRoutine;