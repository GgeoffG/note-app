const fs = require("fs");
const util = require("util");

const readFromFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile);

const readAndAppend = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, JSON.stringify(parsedData));
    }
  });
};

const readAndDelete = (deleteId, file) => {
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) console.error(err);
    else {
      const parsedData = JSON.parse(data);
      for (let i = 0; i < parsedData.length; i++) {
        const { id } = parsedData[i];
        if (id === deleteId) parsedData.splice(i, 1);
      }

      writeToFile(file, parsedData);
    }
  });
};
module.exports = { readFromFile, readAndDelete, readAndAppend };
