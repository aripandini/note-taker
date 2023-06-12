const express = require('express');
const fs = require('fs');
// const { v4: uuidv4 } = require('uuid'); //To generate unique ids

const app = express();


//Open Notes
app.get('/api/notes', (req, res) => {
  readFromFile('./db/db.json').then((data) =>
  res.json(data)
  );
});



module.exports = app;




