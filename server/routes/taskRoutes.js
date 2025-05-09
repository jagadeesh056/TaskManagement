const express = require("express")
const router = express.Router()
const Task = require("../models/Task")

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdOn: -1 })
    res.json(tasks)
  } catch (err) {
    console.error("Error fetching tasks:", err)
    res.status(500).json({ message: err.message })
  }
})

// Search tasks
router.get("/search", async (req, res) => {
  const term = req.query.term || ""
  try {
    const tasks = await Task.find({
      $or: [
        { title: { $regex: term, $options: 'i' } },
        { description: { $regex: term, $options: 'i' } },
        { status: { $regex: term, $options: 'i' } }
      ]
    }).sort({ createdOn: -1 })
    res.json(tasks)
  } catch (err) {
    console.error("Error searching tasks:", err)
    res.status(500).json({ message: err.message })
  }
})

// Get a single task
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }
    res.json(task)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Create a task
router.post("/", async (req, res) => {
  const task = new Task({
    ...req.body,
    createdOn: new Date(),
    lastUpdatedOn: new Date(),
  })
  
  try {
    const newTask = await task.save()
    res.status(201).json(newTask)
  } catch (err) {
    console.error("Error creating task:", err)
    res.status(400).json({ message: err.message })
  }
})

// Update a task
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        lastUpdatedOn: new Date(),
      },
      { new: true },
    )
    
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" })
    }
    
    res.json(updatedTask)
  } catch (err) {
    console.error("Error updating task:", err)
    res.status(400).json({ message: err.message })
  }
})

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }
    
    res.json({ message: "Task deleted successfully" })
  } catch (err) {
    console.error("Error deleting task:", err)
    res.status(500).json({ message: err.message })
  }
})

module.exports = router