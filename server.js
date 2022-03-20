const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid')
let notesJSON = require('./db/db.json')

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

// delete note function
function createNote(body, notesJSON) {
    const newNote = body;
    body.id = uuid.v4();
    notesJSON.push(newNote);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({notes: notesJSON}, null, 2)
        );
        return newNote
}

// create note post route
app.post('/api/notes', (req, res) => {
    let newNote = createNote(req.body, notesJSON);
    res.json(newNote);
})

// delete note function
function deleteNote(id, notesJSON) {

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({notes: notesJSON}, null, 2)
    );
}

// delete route
app.delete('/api/notes/:id', (req, res) => {
    notesJSON = notesJSON.filter(note => {
        return note.id !== req.params.id
    })
    deleteNote(req.id, notesJSON)
    return res.send();
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
})