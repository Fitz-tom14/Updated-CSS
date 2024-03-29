// Sidebar.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import { getFunctions, httpsCallable } from "firebase/functions";
import Clock from "./Clock"; // Adjust the path based on your project structure

import "./Home.css";

const Sidebar = ({ onAddTask }) => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const handleAddClick = (event) => {
    event.preventDefault();

    const newTask = {
      name: inputValue,
      time: time,
      date: date,
    };

    const functions = getFunctions();
    const createTask = httpsCallable(functions, 'createTask');
    createTask(newTask).then((result) => {
      console.log(result);
    }).catch(error => {
      console.error("Error creating task:", error);
    });

    onAddTask(newTask);

    setTasks([...tasks, newTask]);

    setInputValue("");
    setTime("");
    setDate("");
  };

  return (
      <div className="sidebar">
        <form onSubmit={handleAddClick}>
          <label htmlFor="event-task" type="text">
            Enter Task:
          </label>
          <input
              type="text"
              id="event-name"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
          />

          <label htmlFor="time">Time:</label>
          <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
          />

          <label htmlFor="day">Day:</label>
          <input
              type="date"
              id="day"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
          />

          <button type="submit">Create Task</button>
        </form>

        <Clock />

        <div className="tasks-list">
          {tasks.map((task, index) => (
              <div key={index} className="task-item">
                <p>Task: {task.name}</p>
                <p>Time: {task.time}</p>
                <p>Day: {task.date}</p>
              </div>
          ))}
        </div>
      </div>
  );
};

Sidebar.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default Sidebar;
