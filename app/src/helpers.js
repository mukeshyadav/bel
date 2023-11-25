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
    fields.hasOwnProperty("description") &&
    fields.hasOwnProperty("flag")
  ) {
    return true;
  } else {
    return false;
  }
};

module.exports = { readJSONFile, validateTaskData, writeJSONFile };
