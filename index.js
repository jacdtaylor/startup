// const express = require('express');
// const app = express();

// // Define tasks array before setting up routes


// // The service port. In production the front-end code is statically hosted by the service on the same port.
// const port = process.argv.length > 2 ? process.argv[2] : 3000;

// // JSON body parsing using built-in middleware
// app.use(express.json());

// // Serve up the front-end static content hosting
// app.use(express.static('public'));

// // Router for service endpoints
// var apiRouter = express.Router();
// app.use(`/api`, apiRouter);

// apiRouter.get('/tasks', (_req, res) => {
//   res.send(tasks);
// });

// // Add Task
// apiRouter.post('/tasks', (req, res) => {
//     addtask(req.body, tasks);
//     res.send(tasks);
// });


// apiRouter.delete('/tasks/:index', (req, res) => {
//     const index = req.params.index;
//     if (index >= 0 && index < tasks.length) {
//       tasks.splice(index, 1);
//       res.send(tasks);
//     } else {
//       res.status(404).send("Task not found");
//     }
// });

// apiRouter.put('/tasks/:index', (req, res) => {
//   const index = req.params.index;
//   if (index >= 0 && index < tasks.length) {
//       tasks[index] = req.body; // Replace the task at the specified index with the updated task
//       res.send(tasks[index]);
//   } else {
//       res.status(404).send("Task not found");
//   }
// });
// // Return the application's default page if the path is unknown
// app.use((_req, res) => {
//   res.sendFile('index.html', { root: 'public' });
// });

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });


// let tasks = []
// function addtask(newTask, tasks) {
//   tasks.push(newTask);
// }

// api.js
// api.js

const express = require('express');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Gettasks
apiRouter.get('/tasks', (_req, res) => {
  res.send(tasks);
});

// Submittask
apiRouter.post('/task', (req, res) => {
  tasks = updatetasks(req.body, tasks);
  res.send(tasks);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// updatetasks considers a new task for inclusion in the high tasks.
// The high tasks are saved in memory and disappear whenever the service is restarted.
let tasks = [];
function updatetasks(newtask, tasks) {
  let found = false;
  for (const [i, prevtask] of tasks.entries()) {
    if (newtask.task > prevtask.task) {
      tasks.splice(i, 0, newtask);
      found = true;
      break;
    }
  }

  if (!found) {
    tasks.push(newtask);
  }

  if (tasks.length > 10) {
    tasks.length = 10;
  }

  return tasks;
}
