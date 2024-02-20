const playerNameEl = document.querySelector('.player-name');
playerNameEl.textContent = getPlayerName();

function getPlayerName() {
  return localStorage.getItem('userName') ?? 'guest';
}

function InputVisibility() {
    var T = document.getElementById("InputFields");
    var V = document.getElementById("RevealOptions")
    T.style.display = "block";
    V.style.display = "none"
      // <-- Set it to block
}

function ReturnVisibility() {
    var V = document.getElementById("InputFields");
    var T = document.getElementById("RevealOptions")
    T.style.display = "block";
    V.style.display = "none"
}

document.addEventListener("DOMContentLoaded", function() {
    const tasks = []; // Array to store tasks
  
    const taskContainer = document.getElementById('task-container');
    const taskTitleInput = document.getElementById('task-title');
    const taskDateInput = document.getElementById('task-date');
    const createTaskButton = document.querySelector('.create-task-button');
  
    // Function to create a new task
    function createTask(title, date) {
      const task = {
        title: title,
        date: date,
        completion_value: -1,
        completion: "Incomplete"
      };
      tasks.push(task);
      renderTasks();
    }
  
    // Function to render tasks
    function renderTasks() {
      const currentTask = tasks[currentIndex];
      if (currentTask) {
        taskContainer.innerHTML = `
          <h2 class="task-title">${currentTask.title}</h2>
          <p class="task-date">${currentTask.date}</p>
          <p class="completion-status">${currentTask.completion}</p>
          <button class="delete-task-button">Delete</button>
          <button class="edit-task-button">Edit</button>
          <button class="complete-task-button">Toggle Completeness</button>
        `;
      } else {
        taskContainer.innerHTML = '<p>No tasks available</p>';
      }
    }
  
    // Event listener for create task button
    createTaskButton.addEventListener('click', function() {
      const title = taskTitleInput.value;
      const date = taskDateInput.value;
      if (title && date) {
        createTask(title, date);
        taskTitleInput.value = '';
        taskDateInput.value = '';
        ReturnVisibility();
      } else {
        alert('Please enter task title and date.');
      }
    });
  
    // Navigation buttons
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;
  
    prevButton.addEventListener('click', function() {
      if (currentIndex > 0) {
        currentIndex--;
        renderTasks();
      }
    });
  
    nextButton.addEventListener('click', function() {
      if (currentIndex < tasks.length - 1) {
        currentIndex++;
        renderTasks();
      }
      
    });


    taskContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-task-button')) {
          tasks.splice(currentIndex, 1); // Remove the current task
          currentIndex = Math.min(currentIndex, tasks.length - 1); // Adjust currentIndex if necessary
          renderTasks();
        } else if (event.target.classList.contains('edit-task-button')) {
          const currentTask = tasks[currentIndex];
          const taskTitle = prompt('Enter new task title:', currentTask.title);
          const taskDate = prompt('Enter new task date:', currentTask.date);
          if (taskTitle !== null && taskDate !== null) {
            currentTask.title = taskTitle;
            currentTask.date = taskDate;
            renderTasks();
          }} else if (event.target.classList.contains('complete-task-button')) {
            const currentTask = tasks[currentIndex];
            currentTask.completion_value *= -1;
            if (currentTask.completion_value == 1) {
                currentTask.completion = "Completed"
            } else {
                currentTask.completion = "Incomplete"
            }
            renderTasks();
          }}
  );
        })