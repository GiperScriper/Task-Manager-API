const mongoose = require('mongoose');

const Project = mongoose.model('Project', {
  name: {
    type: String,
    required: true,
  },
  updated: {
    type: Number,
  },
});

module.exports = { Project };
