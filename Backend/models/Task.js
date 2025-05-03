const mongoose = require('mongoose'); //Pulls Database link from URL to store Tasks

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: {
      type: String,
      enum: ['To Do', 'In Progress', 'Completed'],
      default: 'To Do', // ✅ ADD THIS DEFAULT
    },
    userId: String,
  });

module.exports = mongoose.model('Task', TaskSchema);