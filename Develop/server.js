const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const api = require('./routes/index.js');


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);


//Root URL
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
  })


//Load Notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
  });



// Add Notes



// Delete Notes 


// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });