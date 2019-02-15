const fs = require('fs');

var fetchNotes = () => {
  try{
    var notesString = fs.readFileSync('notes-data.json');
  return JSON.parse(notesString);
  }catch(e){
      return [];
  }

};

var saveNotes = (notes) => {
fs.writeFileSync('notes-data.json',JSON.stringify(notes));
};



var addNote = (title , body) => {
  var notes = fetchNotes();

  var note = {
    title,
    body,
  };



  var duplicateNotes = notes.filter((note) => note.title === title);

  if(duplicateNotes.length === 0)
  {
    notes.push(note);
    saveNotes(notes);
    return note;
  }



    console.log('Adding Notes');
}
var getNote = (title) => {
  console.log('getting note', title);
  var notes = fetchNotes();
  var noteChoosed = notes.filter((note) => note.title === title );
  return noteChoosed[0];
}

var removeNote = (title) =>{
  console.log('removing title',title);
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);
  return notes.length !== filteredNotes.length ;
}

var getAll = () => {
  console.log('getting all notes');
  return fetchNotes();
}

var logNote = (note) => {
  debugger;
  console.log('--');
  console.log(`Title : ${note.title}`);
  console.log(`Body : ${note.body}`);
}

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote,
}
