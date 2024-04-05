import React, { useState, useEffect } from 'react';
import "./main.css"

export function Manager() {
  const [tasks, setTasks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');





  function displayQuote() {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.content);
        setAuthor(data.author);
      });
  }

  useEffect(() => {
    displayQuote();
    retrieveTasks(currentIndex);
  }, [currentIndex]);

  const getPlayerName = () => {
    return localStorage.getItem('userName') ?? 'guest';
  };

  const createNewTask = async (title, date) => {
    const name = getPlayerName();
    const newTask = {
      id: tasks.length,
      title: title,
      date: date,
      completion_value: -1,
      completion: "Incomplete",
      completion_task: "Complete",
      opacity: 1,
      owner: getPlayerName()
    };

    try {
      const response = await fetch(`/api/task/${name}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newTask),
      });

      const updatedTasks = await response.json();
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error creating new task:', error);
    }
  };

  const retrieveTasks = async (currentIndex) => {
    const name = getPlayerName();
    try {
      const response = await fetch(`/api/tasks/${name}`);
      const tasksData = await response.json();
      setTasks(tasksData);
    } catch (error) {
      console.error('Error retrieving tasks:', error);
      const tasksText = localStorage.getItem('tasks');
      if (tasksText) {
        setTasks(JSON.parse(tasksText));
      }
    }
  };

  const displayTasks = () => {
    if (tasks.length) {
      const task = tasks[currentIndex];
      const taskStyle = {
        opacity: task.opacity
      };
  
      return (
        <div style={taskStyle}>
          <h2 className="task-title">{task.title}</h2>
          <p className="task-date">{task.date}</p>
          <p className="completion-status">{task.completion}</p>
          <button className="delete-task-button" onClick={deleteTask}>Delete</button>
          <button className="edit-task-button" onClick={editTask}>Edit</button>
          <button className="complete-task-button" onClick={completeTask}>Mark as {task.completion_task}</button>
        </div>
      );
    } else {
      return (
        <div>
          {quote && <p className="quote">{quote}</p>}
            {author && <p className="author">- {author}</p>}
        </div>
      );
    }
  };

  const deleteTask = async () => {
    const name = getPlayerName();
    const indexToDelete = currentIndex;
    try {
      const response = await fetch(`/api/delete/${name}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index: indexToDelete }),
      });
      if (response.ok) {
        const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
        setTasks(updatedTasks);
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        }
      } else {
        const errorMessage = await response.text();
        displayErrorMessage(errorMessage);
      }
    } catch (error) {
      displayErrorMessage('Error deleting task: ' + error.message);
    }
  };

  const editTask = () => {
    const taskTitle = prompt('Enter new task title:', tasks[currentIndex].title);
    const taskDate = prompt('Enter new task date:', tasks[currentIndex].date);
    if (taskTitle != null && taskDate != null) {
      const updatedTasks = [...tasks];
      updatedTasks[currentIndex].title = taskTitle;
      updatedTasks[currentIndex].date = taskDate;
      setTasks(updatedTasks);
    }
  };

  const completeTask = async () => {
    const currentTask = tasks[currentIndex];
    currentTask.completion_value *= -1;
    if (currentTask.completion_value === 1) {
      currentTask.opacity = 0.5;
      currentTask.completion = "Completed";
      currentTask.completion_task = "Incomplete";
    } else {
      currentTask.opacity = 1;
      currentTask.completion_task = "Complete";
      currentTask.completion = "Incomplete";
    }
    const name = getPlayerName();
    try {
      const response = await fetch(`/api/complete/${name}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentTask),
      });
      const updatedTasks = await response.json();
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const displayErrorMessage = (message) => {
    return <p>{message}</p>;
  };

  const InputVisibility = () => {
    return (
      <div id="InputFields">
        <input className="text-input" type="text" id="task-title" placeholder="Task Title"></input>
        <button className="create-task-button" onClick={createTask}>Create Task</button>
      </div>
    );
  };

  const ReturnVisibility = () => {
    return (
      <button className="RevealOptions" id="RevealOptions" onClick={InputVisibility}>Create Task</button>
    );
  };

  const createTask = () => {
    const taskTitleInput = document.getElementById('task-title');
    const title = taskTitleInput.value.trim();
    if (title) {
      const now = new Date().toLocaleString();
      createNewTask(title, now);
      taskTitleInput.value = '';
      ReturnVisibility();
    } else {
      alert('Please enter a task title.');
    }
  };

  const prevButtonHandler = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextButtonHandler = () => {
    if (currentIndex < tasks.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <main>
      <div className='manager-page'>
      <div className="task-container" id="task-container">
        {displayTasks()}
      </div>
      {InputVisibility()}
      <br />
      <div>
        <table className="directional">
          <tbody>
            <tr>
              <td>
                <button className="prev" onClick={prevButtonHandler}>Previous</button>
              </td>
              <td>
                <button className="next" onClick={nextButtonHandler}>Next</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </main>
  );
}
