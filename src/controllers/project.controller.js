const { Project } = require('../models/project.model');
const { ObjectId } = require('mongoose').Types;
const _ = require('lodash');

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
    res.status(200).json({ data: response });
  })
  .catch((error) => {
    res.status(400).json(error);
  });
}


function getProjectById(req, res) {
  const projectId = req.params.id;

  if (ObjectId.isValid(projectId)) {
    Project.findById(req.params.id)
    .then((project) => {
      const statusCode = project ? 200 : 404;
      res.status(statusCode).json(project);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
  } else {
    res.status(404).send();
  }
}


function deleteProjectById(req, res) {
  const projectId = req.params.id;

  if (ObjectId.isValid(projectId)) {
    Project.findByIdAndRemove(projectId)
      .then((project) => {
        const statusCode = project ? 200 : 404;
        res.status(statusCode).json(project);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(404).send();
  }
}

function updateProjectById(req, res) {
  const projectId = req.params.id;
  const data = _.pick(req.body, ['title', 'description']);

  if (!ObjectId.isValid(projectId)) {
    return res.status(404).send();
  }

  Project.findByIdAndUpdate(projectId, { $set: data }, { new: true })
    .then((project) => {
      const statusCode = project ? 200 : 404;
      res.status(statusCode).json(project);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
}

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  deleteProjectById,
  updateProjectById,
};
