const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const api = require('./routes/routes');



// Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);
app.use(express.static('public'));


//Homepage 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});

//Load Notes
app.get('/notes', (req, res) => {
  console.log('here')
  res.sendFile(path.join(__dirname, './public/notes.html'))
});



// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });