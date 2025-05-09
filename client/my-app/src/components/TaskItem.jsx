import { useState } from "react"
import "./TaskItem.css"

const TaskItem = ({ task, onDelete, onEdit }) => {
  const [showDetails, setShowDetails] = useState(false)

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "status-completed"
      case "In Progress":
        return "status-in-progress"
      case "Cancelled":
        return "status-cancelled"
      default:
        return "status-pending"
    }
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(task._id)
    }
  }

  return (
    <div className="task-item">
      <div className="task-item-main" onClick={() => setShowDetails(!showDetails)}>
        <div className="task-title">{task.title}</div>
        <div className="task-due-date">{formatDate(task.dueDate)}</div>
        <div className={`task-status ${getStatusClass(task.status)}`}>{task.status}</div>
        <div className="task-actions">
          <button
            className="btn-edit"
            onClick={(e) => {
              e.stopPropagation()
              onEdit(task)
            }}
          >
            Edit
          </button>
          <button
            className="btn-delete"
            onClick={(e) => {
              e.stopPropagation()
              handleDelete()
            }}
          >
            Delete
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="task-details">
          <div className="detail-row">
            <span className="detail-label">Description:</span>
            <span className="detail-value">{task.description || "No description provided"}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Remarks:</span>
            <span className="detail-value">{task.remarks || "No remarks"}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Created By:</span>
            <span className="detail-value">{task.createdBy?.name || "Unknown"}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Created On:</span>
            <span className="detail-value">{formatDateTime(task.createdOn)}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Last Updated By:</span>
            <span className="detail-value">{task.lastUpdatedBy?.name || "Unknown"}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Last Updated On:</span>
            <span className="detail-value">{formatDateTime(task.lastUpdatedOn)}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskItem
