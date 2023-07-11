const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api";


const getURL = (path) => {
    const url = BASE_URL + path;
    console.log(url);
    return url;
}

const getOptions = (method, body, token) => ({
    method: method ? method.toUpperCase() : "GET",
    headers: {
        'Content-Type': 'application/json', 
        // add token if there is one
        ...(token && {'Authorization': `Bearer ${token}`})
    },
    ...( body && { body: JSON.stringify(body) }),
});


export const callAPI = async({path, method, body, token}) => {
    try {
        const result = await fetch(
            getURL(path),
            getOptions(method, body, token),
        );
        const response = await result.json();
        console.log(response);
        if (response.error) throw response.error;
        return response;
    } catch(e) {
        console.error(e);
    }
}

export const registerUser = async (username, password) => {
    try {
      const response = await fetch(
        `${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
       
        },
        body: JSON.stringify({
          
            username: username,
             password: password
         
        })
      });
      const result = await response.json();

      console.log(result)
      return result
    } catch (err) {
      console.error(err);
    }
  }

  export const loginUser = async (username, password) => {
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
      }
  
      const { token, message, user } = await response.json();
  
      localStorage.setItem('token', token);
  
      console.log(message);
  
      return user;
    } catch (error) {
      console.error('Failed to login', error);
    }
}


  

  export const getUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
  
      const response = await fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
      }
  
      const user = await response.json();
  
      console.log(user);
  
      return user;
    } catch (error) {
      console.error('Failed to get user', error);
    }
  }
  
  export const getRoutinesByUsername = async (token, username) => {

    try {
      const response = await fetch(`${BASE_URL}/users/${username}/routines`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }

  export const getActivities = async () => {
    try {
      const response = await fetch(`${BASE_URL}/activities`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const result = await response.json();
  
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  //Posts   Activities//

  export const postActivities = async ({ id, name, description }, token) => {
    try {
      const response = await fetch(`${BASE_URL}/activities`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id,
          name,
          description,
        }) 
      });
  
      const result = await response.json();
  
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }


 // PATCH /activities/:activityId//
 export const updateActivity = async (activityId, name, description) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
  
      const response = await fetch(`${BASE_URL}/${activityId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, description })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
      }
  
      const updatedActivity = await response.json();
  
      console.log(updatedActivity);
  
      return updatedActivity;
    } catch (error) {
      console.error('Failed to update activity', error);
    }
  }

  //GET /api/activities/:activityId/routines//
  export const getRoutinesByActivityId = async (activityId) => {
    try {
      const response = await fetch(`${BASE_URL}/activities/${activityId}/routines`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  //GET /routines//

  export const getAllPublicRoutines = async () => {
    try {
      const response = await fetch(`${BASE_URL}/routines`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  //POST /routines//
  export const createRoutine = async (name, goal, isPublic = null) => {
    try {
      console.log(name);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
  
      const response = await fetch(`${BASE_URL}/routines`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, goal, isPublic })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
      }
  
      const newRoutine = await response.json();
  
      console.log(newRoutine);
  
      return newRoutine;
    } catch (error) {
      console.error('Failed to create routine', error);
    }
  }
  
  //PATCH /routines/:routineId

  export const updateRoutine = async (token, routineId, { name, goal, isPublic }) => {
    try {
      const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          goal,
          isPublic
        })
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  }
  
  //DELETE /routines/:routineId
  export const deleteRoutine = async (token, routineId) => {
    try {
      const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  //POST /routines/:routineId/activities//
  export const addActivityToRoutine = async (routineId, activityId, count, duration) => {
    try {
      const response = await fetch(`${BASE_URL}/routines/${routineId}/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ activityId, count, duration })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
      }
  
      const routineActivity = await response.json();
  
      console.log(routineActivity);
  
      return routineActivity;
    } catch (error) {
      console.error(`Failed to add activity with ID ${activityId} to routine with ID ${routineId}`, error);
    }
  }

   //PATCH /routine_activities/:routineActivityId
   export const updateRoutineActivity = async (token, routineActivityId, { count, duration }) => {
    try {
      const response = await fetch(`${BASE_URL}/routine_activities/${routineActivityId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          count,
          duration
        })
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  }
  

  //DELETE /routine_activities/:routineActivityId
  export const removeActivityFromRoutine = async (token, routineActivityId) => {
    try {
      const response = await fetch(`${BASE_URL}/routine_activities/${routineActivityId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  }