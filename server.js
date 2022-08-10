
const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();
const fs =require('fs');
const path = require('path');

// middle ware 
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))

// makes new notes adds to db.json
function newNoteMaker(body, noteArray){
    const newNote = body;
    noteArray.push(newNote);
  

    fs.writeFilesSync(
      path.join(__dirname, './db/db.json'),
      JSON.stringify({notes: noteArray}, null,2)
    )
    return newNote;
}

// delete note and json join and stringify 
// function deleteNote(id, notes) {
//     const noteId =id;
//     notes.splice(noteId, 1)
//     for(i=0; i < notes.length; i++) {
//       notes[i].id = '' + i + '';
//     }
     

//     fs.writeFileSync(
//       path.join(__dirname, './db/db.json'),
//       JSON.stringify({notes: notes}, null, 2)
//     )
//     return notes;
// }



// get and post 
 app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, './public/index.html',(err, data) => {
    if(err) throw err;
    var notes = JSON.parse(data)

    res.json(notes)
  }))
});

// line 58 and line 76 keep coming up with an error at json.parse when i refresh page it says undefined:1
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'), (err, data) => {
    if(err) throw err;
    // var notes = JSON.parse(data);

    // res.json(notes) 
  });
});

app.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
    if(err) throw err;
    var notes = JSON.parse(data)

    // res.json(notes) 
  })
});

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, './public/index.html'), (err, data) => {
    if(err) throw err;
    // var notes = JSON.parse(data)

    // res.json(notes) 
  })
  })

  app.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, './public/notes.html'), (err, data) => {
      if(err) throw err;
      var notes= JSON.parse(data)

      res.json(notes)
    })
  })
  
  app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});

    


