const express = require("express");
const dotenv = require("dotenv");

const { fetchAllTasks } = require("./src/tasks");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});

app.get("/tasks", fetchAllTasks);
