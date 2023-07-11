import React from 'react'
import { updateRoutine } from '../api'
import {useState} from'react'

const EditRoutine = ({routine, check,token,setUpdateForm}) => { 
    const [name, setName] = useState(routine.name);
    const [goal, setGoal] = useState(routine.goal);
    const [isPublic, setIsPublic] = useState(routine.isPublic);
    const handleSubmit = async (event) => {
     event.preventDefault()
        const data = await updateRoutine (token, routine.id, {name, goal, isPublic})
        if (data.id) {await check()} 
        setUpdateForm(false)
    }

    return <form onSubmit={handleSubmit} id="routines">
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
}

export default EditRoutine;