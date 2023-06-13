const express = require('express');
const db = require('../db/db.json');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid'); //To generate unique ids

const app = express();


//Open Notes
app.get('api/notes', (req, res) => {
  readFromFile('../db/db.json').then((data) =>
  res.json(data)
  );
});

//New Note
app.post('api/notes', (req, res) => {
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


module.exports = app;




