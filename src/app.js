const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const { mongoose } = require('./db/mongoose');

// Models
const { Project } = require('./models/project');

const app = express();

// Middlewares
// parse application/json
app.use(bodyParser.json());

// Create Project
app.post('/projects', (req, res) => {
  const project = new Project(req.body);
  project.save(project)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

// get list of projects
app.get('/projects', (req, res) => {
  Project.find()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

app.use((req, res) => {
  res.status(404).send('endpoint not found');
});

app.listen(config.port, () => {
  console.log(`Task Manager API listening on port ${config.port}`);
});
