// const playerNameEl = document.querySelector('.player-name');
// playerNameEl.textContent = getPlayerName();

// function getPlayerName() {
//   return localStorage.getItem('userName') ?? 'guest';
// }

// function InputVisibility() {
//     var T = document.getElementById("InputFields");
//     var V = document.getElementById("RevealOptions")
//     T.style.display = "block";
//     V.style.display = "none"
//       // <-- Set it to block
// }

// function ReturnVisibility() {
//     var V = document.getElementById("InputFields");
//     var T = document.getElementById("RevealOptions")
//     T.style.display = "block";
//     V.style.display = "none"
// }

// document.addEventListener("DOMContentLoaded", function() {
//     let tasks = [];
//     let currentIndex = 0;
//     const taskContainer = document.getElementById('task-container');
//     const taskTitleInput = document.getElementById('task-title');
//     const taskDateInput = document.getElementById('task-date');
//     const createTaskButton = document.querySelector('.create-task-button');
  
//     // Function to create a new task
//     async function createTask(title, date) {
//       const newTask = {
//         title: title,
//         date: date,
//         completion_value: -1,
//         completion: "Incomplete",
//         completion_task: "Complete",
//         opacity: 1,
//         owner: getPlayerName()
//       };
      
//       try {
//         const response = await fetch('/api/tasks', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(newTask)
//         });
//         renderTasks(response); 
//       } catch (error) {
//         const container = document.getElementById("task-container")
//         container.innerHTML = `
//         <h2>Create Error</h2>
//         <p>${error}</p>
        
//         `
//         // Handle error here
//       }
//     }
//     async function loadTasks() {
//       try {
//         const response = await fetch("/api/tasks");
//         renderTasks(response)
//         // renderTasks(response);
//       }  catch {
//         const container = document.getElementById("task-container")
//         container.innerHTML = `
//         <h2>load Error</h2>
//         <p>${error}</p> `
//         const taskText = localStorage.getItem('tasks');
//         if (taskText) {
//           tasks = JSON.parse(taskText);
//         }
        
//     }
    
//   }
  
//     // Function to render tasks
//     async function renderTasks(response) {
//       tasks = response.json();
//       try {
//           const currentTask = tasks[currentIndex];
//           if (currentTask) {
//               const container = document.getElementById("task-container");
//               container.style.opacity = currentTask.opacity;
//               container.innerHTML = `
//                   <h2 class="task-title">${currentTask.title}</h2>
//                   <p class="task-date">${currentTask.date}</p>
//                   <p class="completion-status">${currentTask.completion}</p>
//                   <button class="delete-task-button">Delete</button>
//                   <button class="edit-task-button">Edit</button>
//                   <button class="share-task-button">Share</button>
//                   <button class="complete-task-button">Mark as ${currentTask.completion_task}</button>
//               `;
//           } else {
//               document.getElementById("task-container").innerHTML = `<p>No tasks available</p>`;
//           }
//       } catch (error) {
//         const container = document.getElementById("task-container")
//         container.innerHTML = `
//         <h2>render Error</h2>
//         <p>${tasks}</p> `
//           // Handle error here
//       }
//   }
  
//     // Event listener for create task button
//     createTaskButton.addEventListener('click', function() {
//       var now = new Date();
//       var datetime = now.toLocaleString();
//       const title = taskTitleInput.value;
//       const date = datetime;
//       if (title && date) {
//         createTask(title, date);
//         taskTitleInput.value = '';
//         ReturnVisibility();
//         if (currentIndex == -1) {
//             currentIndex = 0;
//             loadTasks();
//         }
//       } else {
//         alert('Please enter task title.');
//       }
//     });
  
//     // Navigation buttons
//     const prevButton = document.querySelector('.prev');
//     const nextButton = document.querySelector('.next');
    
  
//     prevButton.addEventListener('click', function() {
//       if (currentIndex > 0) {
//         currentIndex--;
//         renderTasks();
//       } else if (tasks.length == 0 ) {
//         renderTasks()
//       } 
//       else {
//         currentIndex = tasks.length - 1 }
//         renderTasks()
//     });
  
//     nextButton.addEventListener('click', function() {
//       if (currentIndex < tasks.length - 1) {
//         currentIndex++;
//         renderTasks();
//       } else {
//         currentIndex = 0;
//         renderTasks()
//       }
      
//     });


//     taskContainer.addEventListener('click', async function(event) {
//       if (event.target.classList.contains('delete-task-button')) {
//           try {
//               const response = await fetch('/api/tasks', {
//                   method: 'DELETE',
//                   headers: { 'Content-Type': 'application/json' },
//                   body: JSON.stringify(task)
//               });
//               currentIndex = Math.min(currentIndex, tasks.length - 1); // Adjust currentIndex if necessary
//               loadTasks();
//           } catch (error) {
//               console.error('Error deleting task:', error);
//           }
//         } else if (event.target.classList.contains('edit-task-button')) {
//           const currentTask = tasks[currentIndex];
//           const taskTitle = prompt('Enter new task title:', currentTask.title);
//           const taskDate = prompt('Enter new task date:', currentTask.date);
//           if (taskTitle !== null && taskDate !== null) {
//             currentTask.title = taskTitle;
//             currentTask.date = taskDate;
//             fetch(`/api/tasks/${currentIndex}`, {
//               method: 'PUT',
//               headers: {
//                   'Content-Type': 'application/json'
//               },
//               body: JSON.stringify(currentTask)
//           })
//             loadTasks();
          
//           }} else if (event.target.classList.contains('complete-task-button')) {
//             const currentTask = tasks[currentIndex];
//             currentTask.completion_value *= -1;
                
//             if (currentTask.completion_value == 1) {
//                 currentTask.opacity = 0.5


//                 currentTask.completion = "Completed"
//                 currentTask.completion_task ="Incomplete"
//             } else {
//                 currentTask.opacity = 1;
//                 currentTask.completion_task ="Complete"
//                 currentTask.completion = "Incomplete"
//             }
//             fetch(`/api/tasks/${currentIndex}`, {
//               method: 'PUT',
//               headers: {
//                   'Content-Type': 'application/json'
//               },
//               body: JSON.stringify(currentTask)
//           })
//             loadTasks();
//           }}
//   );
//   loadTasks();
// })




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

document.addEventListener("DOMContentLoaded", function() {
  let tasks = [];
  let currentIndex = 0;
  const taskContainer = document.getElementById('task-container');
  const taskTitleInput = document.getElementById('task-title');
  const taskDateInput = document.getElementById('task-date');
  const createTaskButton = document.querySelector('.create-task-button');

  async function createTask(title, date) {
    const newTask = {
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
        body: JSON.stringify(newTask)
      });
      loadTasks(); // Updated to load tasks after creation
    } catch (error) {
      const container = document.getElementById("task-container");
      container.innerHTML = `
        <h2>Create Error</h2>
        <p>${error}</p>
      `;
    }
  }

  async function loadTasks() {
    try {
      const response = await fetch("/api/tasks");
      tasks = await response.json(); // Fixed to await the response.json() call
      renderTasks();
    } catch (error) {
      const container = document.getElementById("task-container");
      container.innerHTML = `
        <h2>Load Error</h2>
        <p>${error}</p>
      `;
      const taskText = localStorage.getItem('tasks');
      if (taskText) {
        tasks = JSON.parse(taskText);
      }
    }
  }

  async function renderTasks() {
    try {
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
      const container = document.getElementById("task-container");
      container.innerHTML = `
        <h2>Render Error</h2>
        <p>${error}</p>
      `;
    }
  }

  createTaskButton.addEventListener('click', function() {
    var now = new Date();
    var datetime = now.toLocaleString();
    const title = taskTitleInput.value;
    const date = datetime;
    if (title && date) {
      createTask(title, date);
      taskTitleInput.value = '';
      ReturnVisibility();
    } else {
      alert('Please enter task title.');
    }
  });

  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');

  prevButton.addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + tasks.length) % tasks.length;
    renderTasks();
  });

  nextButton.addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % tasks.length;
    renderTasks();
  });

  taskContainer.addEventListener('click', async function(event) {
    if (event.target.classList.contains('delete-task-button')) {
      try {
        await fetch(`/api/tasks/${currentIndex}`, {
          method: 'DELETE'
        });
        currentIndex = Math.min(currentIndex, tasks.length - 1);
        loadTasks();
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
        await fetch(`/api/tasks/${currentIndex}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(currentTask)
        });
        loadTasks();
      }
    } else if (event.target.classList.contains('complete-task-button')) {
      const currentTask = tasks[currentIndex];
      currentTask.completion_value *= -1;
      if (currentTask.completion_value == 1) {
        currentTask.opacity = 0.5;
        currentTask.completion = "Completed";
        currentTask.completion_task = "Incomplete";
      } else {
        currentTask.opacity = 1;
        currentTask.completion_task = "Complete";
        currentTask.completion = "Incomplete";
      }
      await fetch(`/api/tasks/${currentIndex}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentTask)
      });
      loadTasks();
    }
  });

  loadTasks();
});

