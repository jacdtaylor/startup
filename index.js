const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the applications static content
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});


apiRouter.get('/user/:email', async (req, res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.email, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});


var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

// Get tasks
secureApiRouter.get('/tasks/:email', (_req, res) => {
  const tasks = DB.PullTasks(email)
  res.send(tasks);
});

// Submit task
secureApiRouter.post('/task/:email', (req, res) => {
  const tasks = PullTasks(email);
  tasks.push(req.body);
  DB.UpdateTask(email, tasks);
  res.send(tasks);
});

secureApiRouter.delete('/delete/:email', (req, res) => {
  const tasks = DB.PullTasks(email);
  tasks.splice(req.body.index, 1);
  DB.UpdateTask(email, tasks);
  res.send(tasks)
});

secureApiRouter.post('/edit', (req, res) => {
  const taskId = req.body.id;
  const updatedTaskData = req.body;

  // Find the index of the task with the given ID
  const taskIndex = tasks.findIndex(task => task.id === taskId); 
  tasks[taskIndex].title = updatedTaskData.title;
  tasks[taskIndex].date = updatedTaskData.date;
  res.send(tasks)});


  apiRouter.post('/complete', (req, res) => {
    const taskId = req.body.id;
    const updatedTaskData = req.body;
  
    // Find the index of the task with the given ID
    const taskIndex = tasks.findIndex(task => task.id === taskId); 
    tasks[taskIndex] = updatedTaskData
  
    res.send(tasks)});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// updateTasks considers a new task for inclusion in the tasks.
// The tasks are saved in memory and disappear whenever the service is restarted.

