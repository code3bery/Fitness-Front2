import React, { useState, useEffect } from "react";
import { getActivities } from "../api";
import AddActivity from "./addActivity";


const viewActivities = ({ token }) => {
  const [activities, setActivities] = useState([]);
  console.log(token)
  const fetchActivities = async () => {
    try {
      const data = await getActivities();
      setActivities(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <>
      {token && <AddActivity token={token} fetchActivities={fetchActivities} />}
      <h1>Activities</h1>
      
      <section className="activity-list">
        {activities.map((activity) => (
          <article key={activity.id} className="activity-item">
            <p>ID: {activity.id}</p>
            <p>Name: {activity.name}</p>
            <p>Description: {activity.description}</p>
          </article>
        ))}
      </section>
    </>
  );
};

export default viewActivities;
