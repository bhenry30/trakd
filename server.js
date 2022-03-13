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
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

function createNote(body, notesArr) {
    const newNote = body;

    if (!Array.isArray(notesArr)) {
    notesArr = []
    };

    body.id = notesArr[0];
    notesArr[0]++;
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArr, null, 2)
    );
    return newNote;
}

// create 
app.post('/api/notes', (req, res) => {
     // if any data in req.body is incorrect, send 400 error back
  if (!req.body.title) {
    res.status(400).send('No title included');
  } else {
    const newNote = createNote(req.body, notesJSON)
    notesJSON.push(newNote)

  }
})

function deleteNote(id, notesArr) {
    
}
// delete
app.delete('/api/notes/:id', (req, res) => {
    notesJSON = notesJSON.filter(note => {
        return note.id !== req.params.id
    })
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesJSON)
    );
    return res.send();
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
})