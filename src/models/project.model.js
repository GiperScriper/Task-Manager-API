const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000,
  },
},
  {
    timestamps: true,
  });

const Project = mongoose.model('Project', projectSchema);

module.exports = { Project };
