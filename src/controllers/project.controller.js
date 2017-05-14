const { Project } = require('../models/project.model');
const { ObjectId } = require('mongoose').Types;
const _ = require('lodash');

function createProject(req, res) {
  let data = _.pick(req.body, ['title', 'description']);
  data._creator = req.user._id;
  const project = new Project(data);
  project.save(project)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
}


async function getProjects(req, res) {
  try {
    const userId = req.user._id;
    const query = { $or: [
      { _creator: userId },
      { members: { $in: [userId] } },
    ] };
    const projects = await Project.find(query);
    res.status(200).json({ data: projects });
  } catch (error) {
    res.status(400).json(error);
  }
}


function getProjectById(req, res) {
  const projectId = req.params.id;

  if (ObjectId.isValid(projectId)) {
    Project.findOne({ _id: projectId, _creator: req.user._id })
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
    Project.findOneAndRemove({ _id: projectId, _creator: req.user._id })
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
  const query = { _id: projectId, _creator: req.user._id };

  if (!ObjectId.isValid(projectId)) {
    return res.status(404).send();
  }

  Project.findOneAndUpdate(query, { $set: data }, { new: true })
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
