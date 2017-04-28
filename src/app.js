const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const { mongoose } = require('./db/mongoose');

// Controllers
const projectController = require('./controllers/project.controller');

const app = express();

// Middlewares
// parse application/json
app.use(bodyParser.json());

app.route('/projects')
  // get list of projects
  .get(projectController.getProjects)
  // Create Project
  .post(projectController.createProject);

app.route('/projects/:id')
  .get(projectController.getProjectById)
  .delete(projectController.deleteProjectById)
  .put(projectController.updateProjectById);

app.use((req, res) => {
  res.status(404).send('endpoint not found');
});

app.listen(config.port, () => {
  console.log(`Task Manager API listening on port ${config.port}`);
});

module.exports = { app };
