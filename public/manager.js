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
    let currentIndex = 0;
    const taskContainer = document.getElementById('task-container');
    const taskTitleInput = document.getElementById('task-title');
    const taskDateInput = document.getElementById('task-date');
    const createTaskButton = document.querySelector('.create-task-button');
  
    // Function to create a new task
    async function createTask(title, date) {
      const task = {
        title: title,
        date: date,
        completion_value: -1,
        completion: "Incomplete",
        completion_task: "Complete",
        opacity: 1,
        owner: getPlayerName()
      };
    
      try {
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(task)
        });
        renderTasks(); 
      } catch (error) {
        console.error('Error creating task:', error);
        // Handle error here
      }
    }
        
  
    // Function to render tasks
    async function renderTasks() {
      try {
          const response = await fetch('/api/tasks');
          const tasks = await response.json();
          const currentTask = tasks[currentIndex];
          if (currentTask) {
              const container = document.getElementById("task-container");
              container.style.opacity = currentTask.opacity;
              container.innerHTML = `
                  <h2 class="task-title">${currentTask.title}</h2>
                  <p class="task-date">${currentTask.date}</p>
                  <p class="completion-status">${currentTask.completion}</p>
                  <button class="delete-task-button">Delete</button>
                  <button class="edit-task-button">Edit</button>
                  <button class="share-task-button">Share</button>
                  <button class="complete-task-button">Mark as ${currentTask.completion_task}</button>
              `;
          } else {
              document.getElementById("task-container").innerHTML = `<p>No tasks available</p>`;
          }
      } catch (error) {
          console.error('Error rendering tasks:', error);
          // Handle error here
      }
  }
  
    // Event listener for create task button
    createTaskButton.addEventListener('click', function() {

        var now = new Date();
        var datetime = now.toLocaleString();
      const title = taskTitleInput.value;
      const date = datetime;
      if (title && date) {
        createTask(title, date);
        taskTitleInput.value = '';
        ReturnVisibility();
        if (currentIndex == -1) {
            currentIndex = 0;
            renderTasks();
        }
      } else {
        alert('Please enter task title.');
      }
    });
  
    // Navigation buttons
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
  
    prevButton.addEventListener('click', function() {
      if (currentIndex > 0) {
        currentIndex--;
        renderTasks();
      } else {
        currentIndex = tasks.length - 1 }
        renderTasks()
    });
  
    nextButton.addEventListener('click', function() {
      if (currentIndex < tasks.length - 1) {
        currentIndex++;
        renderTasks();
      } else {
        currentIndex = 0;
        renderTasks()
      }
      
    });


    taskContainer.addEventListener('click', async function(event) {
      if (event.target.classList.contains('delete-task-button')) {
          try {
              const response = await fetch('/api/tasks', {
                  method: 'DELETE',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(task)
              });
              currentIndex = Math.min(currentIndex, tasks.length - 1); // Adjust currentIndex if necessary
              renderTasks();
          } catch (error) {
              console.error('Error deleting task:', error);
          }
        } else if (event.target.classList.contains('edit-task-button')) {
          const currentTask = tasks[currentIndex];
          const taskTitle = prompt('Enter new task title:', currentTask.title);
          const taskDate = prompt('Enter new task date:', currentTask.date);
          if (taskTitle !== null && taskDate !== null) {
            currentTask.title = taskTitle;
            currentTask.date = taskDate;
            fetch(`/api/tasks/${currentIndex}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(currentTask)
          })
            renderTasks();
          
          }} else if (event.target.classList.contains('complete-task-button')) {
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
            fetch(`/api/tasks/${currentIndex}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(currentTask)
          })
            renderTasks();
          }}
  );
        })