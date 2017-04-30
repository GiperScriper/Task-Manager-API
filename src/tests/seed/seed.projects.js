const { Project } = require('../../models/project.model');
const { ObjectId } = require('mongoose').Types;

const projects = [
  { _id: new ObjectId(), title: 'project #1' },
  { _id: new ObjectId(), title: 'project #2' },
  { _id: new ObjectId(), title: 'project #3' },
  { _id: new ObjectId(), title: 'project #4' },
  { _id: new ObjectId(), title: 'project #5' },
];

function populateProjects(done) {
  Project.remove({})
  .then(() => {
    Project.insertMany(projects);
  })
  .then(() => done());
}

module.exports = {
  populateProjects,
  projects,
};
