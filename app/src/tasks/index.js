const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { readJSONFile, validateTaskData, writeJSONFile } = require("../helpers");

const FAKE_TASKS_FILE = path.join(__dirname, "fake-task-data.json");

const fetchAllTasks = async (req, res) => {
  try {
    const tasks = await readJSONFile(FAKE_TASKS_FILE);

    if (req.query.status) {
      const status = JSON.parse(req.query.status);
      const tasksByStatus = tasks
        .filter((task) => task.flag === status)
        .sort((a, b) => {
          return new Date(b.creationDate) - new Date(a.creationDate);
        });
      return res.status(200).send(tasksByStatus);
    }
    return res.status(200).send(tasks);
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const fetchTaskById = async (req, res) => {
  try {
    const tasks = await readJSONFile(FAKE_TASKS_FILE);
    const task = tasks.find(({ id }) => id === req.params.id);
    if (!task) {
      return res.status(404).send(`Task with id ${req.params.id} not found`);
    }
    return res.send(task);
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const createTask = async (req, res) => {
  try {
    const isFieldsValid = validateTaskData(req.body);
    if (!isFieldsValid) {
      return res.status(400).send("Please provide all required fields");
    }
    const tasks = await readJSONFile(FAKE_TASKS_FILE);
    const id = uuidv4();
    const task = {
      id,
      creationDate: new Date().toISOString(),
      ...req.body,
    };
    tasks.push(task);
    await writeJSONFile(FAKE_TASKS_FILE, tasks);
    return res.status(201).send("New task has been added, with id: " + id);
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const updateTaskById = async (req, res) => {
  try {
    const tasks = await readJSONFile(FAKE_TASKS_FILE);
    const task = tasks.find(({ id }) => id === req.params.id);
    if (!task) {
      return res.status(404).send(`Task with id ${req.params.id} not found`);
    }
    const updatedTask = {
      ...task,
      ...req.body,
    };
    const isFieldsValid = validateTaskData(updatedTask);
    if (!isFieldsValid) {
      return res.status(400).send("Please provide all required fields");
    }
    const updatedTasks = tasks.map((task) =>
      task.id === req.params.id ? updatedTask : task
    );
    await writeJSONFile(FAKE_TASKS_FILE, updatedTasks);
    return res
      .status(200)
      .send(`Task with id ${req.params.id} has been updated`);
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const deleteTaskById = async (req, res) => {
  try {
    const tasks = await readJSONFile(FAKE_TASKS_FILE);
    const task = tasks.find(({ id }) => id === req.params.id);
    if (!task) {
      return res.status(404).send(`Task with id ${req.params.id} not found`);
    }
    const updatedTasks = tasks.filter((task) => task.id !== req.params.id);
    await writeJSONFile(FAKE_TASKS_FILE, updatedTasks);
    return res
      .status(200)
      .send(`Task with id ${req.params.id} has been deleted`);
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const fetchTaskByPriorityLevel = async (req, res) => {
  try {
    const tasks = await readJSONFile(FAKE_TASKS_FILE);
    const task = tasks.filter(({ priority }) => priority === req.params.level);
    if (!task) {
      return res
        .status(404)
        .send(`Task with priority ${req.params.priority} not found`);
    }
    return res.status(200).send(task);
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  fetchAllTasks,
  fetchTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
  fetchTaskByPriorityLevel,
};
