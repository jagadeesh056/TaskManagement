import "./TaskList.css"

const TaskList = ({ tasks, onDelete, onEdit }) => {
  const taskItems = Array.isArray(tasks) ? tasks : []

  if (taskItems.length === 0) {
    return <div className="no-tasks">No tasks found</div>
  }

  return (
    <div className="task-list">
      <h2>Tasks</h2>
      <div className="tasks-container">
        {taskItems.map((task) => (
          <div key={task._id} className="task-card">
            <div className="task-header">
              <h3>{task.title}</h3>
              <span className={`status ${task.status.toLowerCase()}`}>
                {task.status}
              </span>
            </div>
            <p className="task-description">{task.description}</p>
            <div className="task-meta">
              <span>Priority: {task.priority}</span>
              <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
            <div className="task-actions">
              <button onClick={() => onEdit(task)} className="btn-edit">
                Edit
              </button>
              <button onClick={() => onDelete(task._id)} className="btn-delete">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskList