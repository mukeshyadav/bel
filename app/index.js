const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const {
  fetchAllTasks,
  fetchTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
} = require("./src/tasks");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});

app.get("/tasks", fetchAllTasks);
app.get("/tasks/:id", fetchTaskById);

app.post("/tasks", createTask);
app.put("/tasks/:id", updateTaskById);
app.delete("/tasks/:id", deleteTaskById);
