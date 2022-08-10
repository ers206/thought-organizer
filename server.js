// added this file in root was not in starter code 

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
    return newNote
}


app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });

