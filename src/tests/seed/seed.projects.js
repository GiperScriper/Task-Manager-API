const { Project } = require('../../models/project.model');
const { ObjectId } = require('mongoose').Types;
const { users } = require('./seed.users');

const projects = [
  { _id: new ObjectId(), title: 'project #1', _creator: users[0]._id },
  { _id: new ObjectId(), title: 'project #2', _creator: users[1]._id },
  { _id: new ObjectId(), title: 'project #3', _creator: users[0]._id },
  { _id: new ObjectId(), title: 'project #4', _creator: users[0]._id },
  { _id: new ObjectId(), title: 'project #5', _creator: users[1]._id },
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
