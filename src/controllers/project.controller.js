const { Project } = require('../models/project.model');

function createProject(req, res) {
  const project = new Project(req.body);
  project.save(project)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
}


function getProjects(req, res) {
  Project.find()
  .then((response) => {
    res.status(200).json(response);
  })
  .catch((error) => {
    res.status(400).json(error);
  });
}

module.exports = { createProject, getProjects };
