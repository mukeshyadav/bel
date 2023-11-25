const fs = require("fs");

const readJSONFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: "utf-8", flag: "r" }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

const writeJSONFile = (path, data) => {
  fs.writeFile(
    path,
    JSON.stringify(data),
    { encoding: "utf-8", flag: "w" },
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
};

const validateTaskData = (fields) => {
  if (
    fields.hasOwnProperty("title") &&
    !!fields.title.length &&
    fields.hasOwnProperty("description") &&
    !!fields.description.length &&
    fields.hasOwnProperty("flag") &&
    typeof fields.flag !== "string" &&
    fields.hasOwnProperty("priority") &&
    (fields.priority === "low" ||
      fields.priority === "medium" ||
      fields.priority === "high")
  ) {
    return true;
  } else {
    return false;
  }
};

module.exports = { readJSONFile, validateTaskData, writeJSONFile };
