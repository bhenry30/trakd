const express = require('express');
const path = require('path');
const fs = require('fs');
const notesJSON = require('./db/db.json')

const PORT = process.env.PORT || 3000;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('/api/notes', (req, res) => {
    res.json(notesJSON);
});
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// create 
app.post('/api/notes', (req, res) => {
     // if any data in req.body is incorrect, send 400 error back
  if (!req.body.title) {
    res.status(400).send('No title included');
  } else {
    // const note = (req.body, );
    notesJSON.push(note)

  }
})

// delete
app.delete

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
})