const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('task_manager');
const  userCollection = db.collection("user")

(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });
  
  function getUser(email) {
    return userCollection.findOne({ email: email });
  }
  
  function getUserByToken(token) {
    return userCollection.findOne({ token: token });
  }
  
  async function createUser(email, password) {
    // Hash the password before we insert it into the database
    const passwordHash = await bcrypt.hash(password, 10);
  
    const user = {
      email: email,
      password: passwordHash,
      token: uuid.v4(),
      tasks: []
    };
    await userCollection.insertOne(user);
  
    return user;
  }

async function addTaskToUser(email, task) {
    const user = await userCollection.findOne({ email: email });
    if (!user) {
        throw new Error('User not found');
    }
    user.tasks.push(task);
    await userCollection.updateOne({ email: email }, { $set: { tasks: user.tasks } });
    return user;
}


module.exports = {
addTaskToUser,
getUserByToken,
createUser

  };
  