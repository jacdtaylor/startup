const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');

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


apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});
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
secureApiRouter.get('/tasks/:email', async (req, res) => {
    res.send(await DB.PullTasks(req.params.email));
});

secureApiRouter.get('/Forums/:email', async (req, res) => {
  res.send(await DB.PullForum(req.params.email));
});

secureApiRouter.post('Forum/:email', async (req, res) => {
  console.log(req.body)
  DB.UpdateForum(req.params.email, req.body.newForum);
  req.send(req.body);
})
// Submit task
secureApiRouter.post('/task/:email', async (req, res) => {
  try {
    let tasks = await DB.PullTasks(req.params.email);
    if (!tasks) { tasks = array(); }
  tasks.push(req.body);
  console.log(tasks);
  await DB.UpdateTask(req.params.email, tasks);
  res.send(tasks); } catch (error) {console.log(error)}
});

secureApiRouter.delete('/delete/:email', async (req, res) => {
  const tasks = await DB.PullTasks(req.params.email);
  tasks.splice(req.body.index, 1);
  await DB.UpdateTask(req.params.email, tasks);
  res.send(tasks)
});

secureApiRouter.post('/edit/:email', async (req, res) => {
  const taskId = req.body.id;
  const updatedTaskData = req.body;

  // Find the index of the task with the given ID
  const tasks = await DB.PullTasks(req.params.email);
  const taskIndex = tasks.findIndex(task => task.id === taskId); 
  tasks[taskIndex].title = updatedTaskData.title;
  tasks[taskIndex].date = updatedTaskData.date;
  await DB.UpdateTask(req.params.email, tasks);
  res.send(await DB.PullTasks(req.params.email))});


  apiRouter.post('/complete/:email', async (req, res) => {
    const tasks = await DB.PullTasks(req.params.email);
    const taskId = req.body.id;
    const updatedTaskData = req.body;
  
    // Find the index of the task with the given ID
    const taskIndex = tasks.findIndex(task => task.id === taskId); 
    tasks[taskIndex] = updatedTaskData;
    await DB.UpdateTask(req.params.email, tasks);
    res.send(await DB.PullTasks(req.params.email))});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}


const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);
// updateTasks considers a new task for inclusion in the tasks.
// The tasks are saved in memory and disappear whenever the service is restarted.

