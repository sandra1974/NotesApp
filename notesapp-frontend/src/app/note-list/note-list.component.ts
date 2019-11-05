import { Component, OnInit, Input, Output,  Pipe, PipeTransform } from '@angular/core';
import { Note } from '../note';
import { NgForm } from '@angular/forms';
import { NoteService } from '../note.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {

 notes: Note[];
  newNote: Note = new Note();
  editing: boolean = false;
  editingNote: Note = new Note();
  
  page = 1;

  
    constructor(
    private noteService: NoteService) {
    }
  
  ngOnInit(): void {
    this.getNotes();
  }

    //sorting
  key: string = 'title'; //set default
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  
  getNotes(): void {
  this.noteService.getNotes()
      .then(notes => this.notes = notes );    
  }

  createNote(noteForm: NgForm): void {
 this.noteService.createNote(this.newNote)
      .then(createNote => {        
        noteForm.reset();
        this.newNote = new Note();
        this.notes.unshift(createNote)
      });
  }

  deleteNote(id: string): void {
  this.noteService.deleteNote(id)
    .then(() => {
      this.notes = this.notes.filter(note => note.id != id);
    });
  }

  updateNote(noteData: Note): void {
 console.log(noteData);
    this.noteService.updateNote(noteData)
    .then(updatedNote => {
      let existingNote = this.notes.find(note => note.id === updatedNote.id);
      Object.assign(existingNote, updatedNote);
      this.clearEditing();
    });
  }

  toggleCompleted(noteData: Note): void {
  noteData.completed = !noteData.completed;
    this.noteService.updateNote(noteData)
    .then(updatedNote => {
      let existingNote = this.notes.find(note => note.id === updatedNote.id);
      Object.assign(existingNote, updatedNote);
    });
  }

  editNote(noteData: Note): void {
 this.editing = true;
    Object.assign(this.editingNote, noteData);
  }

  clearEditing(): void {
  this.editingNote = new Note();
    this.editing = false;
  }
      
}


@Pipe({
    name: "arrayFilter"
})

export class FilterPipe implements PipeTransform {
   transform(value:any[],searchString:string ){

       if(!searchString){
         console.log('no search')
         return value  
       }

       return value.filter(it=>{   
         
           const title = it.title.toLowerCase().includes(searchString.toLowerCase())
           
           console.log( title);
           return (title );      
       }) 
    }
}






