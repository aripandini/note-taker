const express = require('express');
const db = require('../db/db.json');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid'); //To generate unique ids

const app = express();

//Open Notes
app.get('/notes', (req, res) => {
  readFromFile('./db/db.json').then((data) =>
  res.json(JSON.parse(data))
  );
});

//New Note
app.post('/notes', (req, res) => {
  const { title, text } = req.body;

  if(title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4()
    };
    const response = {
      body: newNote
    };

    db.push(newNote);
    readAndAppend(newNote, './db/db.json');

    res.json(response);
  } else {
    res.json('Error creating a new note');
  }
});

//Delete Note
app.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id !== noteId);
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`${noteId} has been deleted`);
    });
});

module.exports = app;