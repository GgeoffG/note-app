const express = require("express");
const notes = express.Router();

const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  readAndAppend,
  readAndDelete,
} = require("../helpers/fsUtils");

notes.get("/", async (req, res) => {
  const noteData = await readFromFile("./db/db.json");
  res.json(JSON.parse(noteData));
});

notes.post("/", async (req, res) => {
  try {
    const newNote = await readAndAppend(
      {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
      },
      "./db/db.json"
    );
    res.status(200).json(newNote);
  } catch (err) {
    res.status(500).json(err);
  }
});

notes.delete("/:id", async (req, res) => {
  try {
    const deleteData = await readAndDelete(req.params.id, "db/db.json");
    res.json({ message: `${deleteData} 'deleted'` });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = notes;
