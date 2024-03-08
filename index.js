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

apiRouter.get('/tasks', (_req, res) => {
  res.send(tasks);
});

// Add Task
apiRouter.post('/tasks', (req, res) => {
    const newTask = req.body;
    tasks.push(newTask)
    res.send(scores);
});


apiRouter.delete('/tasks/:index', (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < tasks.length) {
      tasks.splice(index, 1);
    }});

apiRouter.put('/tasks/:index', (req, res) => {
  const index = req.params.index;
  if (index >= 0 && index < tasks.length) {
      tasks[index] = req.body; // Replace the task at the specified index with the updated task
      res.send(tasks);
  } else {
      res.status(404).send("Task not found");
  }
});
// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});