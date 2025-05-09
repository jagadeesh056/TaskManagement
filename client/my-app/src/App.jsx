import { useState, useEffect } from "react"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
import SearchBar from "./components/SearchBar"
import "./App.css"

function App() {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentTask, setCurrentTask] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState(null)
  const [user, setUser] = useState({ id: "1", name: "Demo User" })

  const url = "http://localhost:5000/api/tasks"

  // Fetch all tasks
  const fetchTasks = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`)
      }
      
      const data = await response.json()
      
      // Ensure data is an array
      if (!Array.isArray(data)) {
        console.warn("API did not return an array for tasks", data)
        setTasks([])
      } else {
        setTasks(data)
      }
    } catch (error) {
      console.error("Error fetching tasks:", error)
      setError("Failed to load tasks. Please try again later.")
      setTasks([])
    } finally {
      setIsLoading(false)
    }
  }

  // Create a new task
  const createTask = async (taskData) => {
    setError(null)
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...taskData,
          createdBy: user,
          lastUpdatedBy: user,
        }),
      })

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`)
      }

      fetchTasks()
    } catch (error) {
      console.error("Error creating task:", error)
      setError("Failed to create task. Please try again.")
    }
  }

  // Update an existing task
  const updateTask = async (id, taskData) => {
    setError(null)
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...taskData,
          lastUpdatedBy: user,
        }),
      })

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`)
      }

      fetchTasks()
      setCurrentTask(null)
    } catch (error) {
      console.error("Error updating task:", error)
      setError("Failed to update task. Please try again.")
    }
  }

  // Delete a task
  const deleteTask = async (id) => {
    setError(null)
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`)
      }

      fetchTasks()
    } catch (error) {
      console.error("Error deleting task:", error)
      setError("Failed to delete task. Please try again.")
    }
  }

  // Search tasks
  const searchTasks = async (term) => {
    setSearchTerm(term)
    setError(null)
    
    if (!term.trim()) {
      fetchTasks()
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`${url}/search?term=${encodeURIComponent(term)}`)
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (!Array.isArray(data)) {
        console.warn("API did not return an array for search results", data)
        setTasks([])
      } else {
        setTasks(data)
      }
    } catch (error) {
      console.error("Error searching tasks:", error)
      setError("Failed to search tasks. Please try again.")
      setTasks([])
    } finally {
      setIsLoading(false)
    }
  }

  // Edit task
  const editTask = (task) => {
    setCurrentTask(task)
  }

  // Cancel editing
  const cancelEdit = () => {
    setCurrentTask(null)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Management Application</h1>
        <p>Current User: {user.name}</p>
      </header>
      <section className="form-section">
        <TaskForm 
          onSubmit={currentTask ? updateTask : createTask} 
          currentTask={currentTask} 
          onCancel={cancelEdit} 
        />
      </section>

      <main className="app-main">
        <section className="list-section">
          <section className="search-section">
            <SearchBar onSearch={searchTasks} />
            {error && <div className="error-message">{error}</div>}
          </section>
          {isLoading ? (
            <div className="loading">Loading tasks...</div>
          ) : (
            <TaskList 
              tasks={tasks} 
              onDelete={deleteTask} 
              onEdit={editTask} 
            />
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Task Management App</p>
      </footer>
    </div>
  )
}

export default App