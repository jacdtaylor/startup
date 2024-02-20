const playerNameEl = document.querySelector('.player-name');
playerNameEl.textContent = getPlayerName();

function getPlayerName() {
  return localStorage.getItem('userName') ?? 'guest';
}


document.addEventListener("DOMContentLoaded", function() {
    const tasks = []; // Array to store tasks
  
    const taskContainer = document.querySelector('.task-container');
    const taskTitleInput = document.querySelector('#task-title');
    const taskDateInput = document.querySelector('#task-date');
    const createTaskButton = document.querySelector('.create-task-button');
  
    // Function to create a new task
    function createTask(title, date) {
      const task = {
        title: title,
        date: date
      };
      tasks.push(task);
      renderTask(task);
    }
  
    // Function to render a task
    function renderTask(task) {
      const taskElement = document.createElement('div');
      taskElement.classList.add('task-item');
      taskElement.innerHTML = `
        <h2 class="task-title">${task.title}</h2>
        <p class="task-date">${task.date}</p>
        <button class="edit-task-button">Edit</button>
        <button class="delete-task-button">Delete</button>
      `;
      taskContainer.appendChild(taskElement);
    }
  
    // Event listener for create task button
    createTaskButton.addEventListener('click', function() {
      const title = taskTitleInput.value;
      const date = taskDateInput.value;
      if (title && date) {
        createTask(title, date);
        taskTitleInput.value = '';
        taskDateInput.value = '';
      } else {
        alert('Please enter task title and date.');
      }
    });
  
    // Event delegation for edit and delete task buttons
    taskContainer.addEventListener('click', function(event) {
      if (event.target.classList.contains('edit-task-button')) {
        // Implement edit task functionality here
        // You can open a modal with inputs prefilled with task details
        // Update the task in the tasks array and re-render the task
      } else if (event.target.classList.contains('delete-task-button')) {
        const taskElement = event.target.closest('.task-item');
        const index = Array.from(taskElement.parentElement.children).indexOf(taskElement);
        tasks.splice(index, 1);
        taskElement.remove();
      }
    });
  
    // Scroll functionality
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
  
    let currentIndex = 0;
  
    prevButton.addEventListener('click', function() {
      if (currentIndex > 0) {
        currentIndex--;
        scrollTasks();
      }
    });
  
    nextButton.addEventListener('click', function() {
      if (currentIndex < tasks.length - 1) {
        currentIndex++;
        scrollTasks();
      }
    });
  
    function scrollTasks() {
      const taskElements = document.querySelectorAll('.task-item');
      taskElements.forEach((task, index) => {
        if (index === currentIndex) {
          task.classList.add('active-task');
        } else {
          task.classList.remove('active-task');
        }
      });
    }
  });