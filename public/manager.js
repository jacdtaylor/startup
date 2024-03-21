const playerNameEl = document.querySelector('.player-name');
playerNameEl.textContent = getPlayerName();

function getPlayerName() {
  return localStorage.getItem('userName') ?? 'guest';
}

function InputVisibility() {
  var T = document.getElementById("InputFields");
  var V = document.getElementById("RevealOptions");
  T.style.display = "block";
  V.style.display = "none";
}

function ReturnVisibility() {
  var V = document.getElementById("InputFields");
  var T = document.getElementById("RevealOptions");
  T.style.display = "block";
  V.style.display = "none";
}


document.addEventListener('DOMContentLoaded', function() {
  let tasks = [];
  let idnum = 0
  const createTaskButton = document.querySelector('.create-task-button');
  let currentIndex = 0; // Initialize currentIndex

  async function createNewTask(title, date) {
    const name = getPlayerName();
    const newTask = {
              id:idnum,
              title: title,
              date: date,
              completion_value: -1,
              completion: "Incomplete",
              completion_task: "Complete",
              opacity: 1,
              owner: getPlayerName()
            };
            idnum++;
    try {
      const response = await fetch(`/api/task/${name}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      
      const tasks = await response.json();
       // Push the created task to the tasks array
    } catch (error) {
      console.error('Error creating new task:', error);
    }
    displayTasks(tasks, currentIndex);
    
  }

  async function retrieveTasks(currentIndex) {
    const name = getPlayerName();
    try {
      const response = await fetch(`/api/tasks/${name}`);
      tasks = await response.json();
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error retrieving tasks:', error);
      const tasksText = localStorage.getItem('tasks');
      if (tasksText) {
        tasks = JSON.parse(tasksText);
      }
    }
    displayTasks(tasks, currentIndex);
  }

  // Display tasks based on the currentIndex
  async function displayTasks(tasks, currentIndex) {
    console.log(tasks)
    const container = document.getElementById("task-container");
    container.innerHTML = ""; // Clear the container before adding new tasks

    if (tasks.length) {
      const task = tasks[currentIndex]; // Get the current task
      container.style.opacity = task.opacity;
              container.innerHTML = `
                  <h2 class="task-title">${task.title}</h2>
                  <p class="task-date">${task.date}</p>
                  <p class="completion-status">${task.completion}</p>
                  <button class="delete-task-button">Delete</button>
                  <button class="edit-task-button">Edit</button>
                  <button class="share-task-button">Share</button>
                  <button class="complete-task-button">Mark as ${task.completion_task}</button>
              `;
    } else {
      fetch('https://api.quotable.io/random')
    .then((response) => response.json())
    .then((data) => {
        

      container.innerHTML = `<p>"${data.content}"</p>
      <p>${data.author}</p>`;})
    }
  }

  // Event listener for create task button
  createTaskButton.addEventListener('click', function() {
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
  });

  // Event listeners for navigation buttons
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');

  prevButton.addEventListener('click', function() {
    if (currentIndex > 0) {
      currentIndex--;
      displayTasks(tasks, currentIndex);
    }
  });

  nextButton.addEventListener('click', function() {
    if (currentIndex < tasks.length - 1) {
      currentIndex++;
      displayTasks(tasks, currentIndex);
    }
  });
 // Event listener for task-container (Event Delegation)
document.getElementById("task-container").addEventListener('click', async function(event) {
  const name = getPlayerName();
  if (event.target.classList.contains('delete-task-button')) {
    const indexToDelete = currentIndex; // Store the current index to delete
    try {
      
      const response = await fetch(`/api/delete/${name}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index: indexToDelete }),
      });
      if (response.ok) {
        tasks.splice(indexToDelete, 1); // Remove the deleted task locally
        if (currentIndex > 0) {
          currentIndex--; // Decrement currentIndex if necessary
        }
        displayTasks(tasks, currentIndex);
      } else {
        const errorMessage = await response.text(); // Get error message from server
        displayErrorMessage(errorMessage);
      }
    } catch (error) {
      displayErrorMessage('Error deleting task: ' + error.message);
    }
  } else if (event.target.classList.contains('edit-task-button')) {
          const taskTitle = prompt('Enter new task title:', tasks[currentIndex].title);
          const taskDate = prompt('Enter new task date:', tasks[currentIndex].date);
          if (taskTitle != null && taskDate != null) {
            tasks[currentIndex].title = taskTitle;
            tasks[currentIndex].date = taskDate;

      try {
        const response = await fetch(`/api/edit${name}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tasks[currentIndex]),
        });
        if (response.ok) {
          const tasks = await response.json();
          // Handle the edited task data as needed
        } else {
          const errorMessage = await response.text();
          // Handle error response
        }
      } catch (error) {
        // Handle network or other errors
        console.error('Error editing task:', error);
      }
      displayTasks(tasks, currentIndex);

    }
    
  }else if (event.target.classList.contains('complete-task-button')) {
                const currentTask = tasks[currentIndex];
                currentTask.completion_value *= -1;
                if (currentTask.completion_value == 1) {
                    currentTask.opacity = 0.5
                    currentTask.completion = "Completed"
                    currentTask.completion_task ="Incomplete"
                } else {
                    currentTask.opacity = 1;
                    currentTask.completion_task ="Complete"
                    currentTask.completion = "Incomplete"
                }
                try {
                    const response = await fetch(`/api/complete/${name}`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(currentTask),
                    });
                    const tasks = await response.json();
                    displayTasks(tasks, currentIndex)
                } catch (error) {
                  console.error('Error completing task:', error);
                }
}});

// Function to display error message
function displayErrorMessage(message) {
  const container = document.getElementById("task-container");
  container.innerHTML = `<p>${message}</p>`;
}





  // Call the function to retrieve tasks when the DOM is loaded
  retrieveTasks(currentIndex);
});

