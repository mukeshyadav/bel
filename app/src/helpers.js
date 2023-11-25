const fs = require("fs");

const readJSONFile = (path) => {
  console.log(__dirname);
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

module.exports = { readJSONFile };
