const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const taskRoutes = require("./routes/taskRoutes")
const app = express()
const PORT = process.env.PORT || 5000

require('dotenv').config();

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/api/tasks", taskRoutes)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})