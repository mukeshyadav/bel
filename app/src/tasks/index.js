const { readJSONFile } = require("../helpers");

const FAKE_TASKS_FILE = `${__dirname}/fake-task-data.json`;

const fetchAllTasks = async (req, res) => {
  try {
    const tasks = await readJSONFile(FAKE_TASKS_FILE);
    return res.send(tasks);
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = { fetchAllTasks };
