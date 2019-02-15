const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs')

const notes = require('./notes.js')
var titleOptions =  {
  desciption : 'Title of note',
  demand : true,
  alias: 't',
};

var bodyOptions =   {
  desciption : 'Body of note',
  demand : true,
  alias: 'b',
};

const argv = yargs.
command('add','add a new note',{
  title: titleOptions,
  body: bodyOptions,
}).command('list','List all Notes')
.command('read','Read a Note',{
  title: titleOptions,
}).command('remove','Remove a note',{
  title: titleOptions,
}).help().argv;
var command = process.argv[2]
console.log(argv._[0]);



if(command === 'add')
{
var note = notes.addNote(argv.title , argv.body);
    if (note) {
      console.log('Note created');
      notes.logNote(note);
    }else {
      console.log('Note title Taken');
    }
}else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`Printing all ${allNotes.length} note(s).`);
  allNotes.forEach((note)=> notes.logNote(note))
}else if (command === 'read') {
  var note = notes.getNote(argv.title);
  if (note) {
    console.log('Note found');
    notes.logNote(note);
  }else {
    console.log('Note title doesnot match');
  }
}else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed':'Note not found';
  console.log(message);

}
else {
  console.log('Input not recognized');
}
