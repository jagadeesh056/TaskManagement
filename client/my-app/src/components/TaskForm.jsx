import { useState, useEffect } from "react"
import "./TaskForm.css"

const TaskForm = ({ onSubmit, currentTask, onCancel }) => {
  const initialFormState = {
    title: "",
    description: "",
    priority: "Medium",
    status: "To Do",
    dueDate: new Date().toISOString().split("T")[0],
  }

  const [formData, setFormData] = useState(initialFormState)

  // Update form data when currentTask changes (for editing)
  useEffect(() => {
    if (currentTask) {
      setFormData({
        title: currentTask.title || "",
        description: currentTask.description || "",
        priority: currentTask.priority || "Medium",
        status: currentTask.status || "To Do",
        dueDate: currentTask.dueDate 
          ? new Date(currentTask.dueDate).toISOString().split("T")[0] 
          : new Date().toISOString().split("T")[0],
      })
    } else {
      setFormData(initialFormState)
    }
  }, [currentTask])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (currentTask) {
      onSubmit(currentTask._id, formData)
    } else {
      onSubmit(formData)
    }
    setFormData(initialFormState)
  }

  return (
    <div className="task-form">
      <h2>{currentTask ? "Edit Task" : "Add New Task"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Review">Review</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            {currentTask ? "Update Task" : "Add Task"}
          </button>
          {currentTask && (
            <button type="button" onClick={onCancel} className="btn-cancel">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default TaskForm