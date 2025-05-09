const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    required: true,
    enum: ["To Do", "In Progress", "Review", "Done"],
    default: "To Do"
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High", "Urgent"],
    default: "Medium"
  },
  dueDate: {
    type: Date,
    default: Date.now
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  lastUpdatedOn: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  lastUpdatedBy: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
})

module.exports = mongoose.model("Task", taskSchema)