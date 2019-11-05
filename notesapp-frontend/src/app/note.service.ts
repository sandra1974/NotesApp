import { Injectable } from '@angular/core';
import { Note } from './note';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';



@Injectable({
  providedIn: 'root'
})
export class NoteService {

 private baseUrl = 'http://localhost:8080';

  constructor(private http: Http) { }

  getNotes():  Promise<Note[]> {
    return this.http.get(this.baseUrl + '/api/notes/')
      .toPromise()
      .then(response => response.json() as Note[])
      .catch(this.handleError);
  }

  createNote(noteData: Note): Promise<Note> {
    return this.http.post(this.baseUrl + '/api/notes/', noteData)
      .toPromise().then(response => response.json() as Note)
      .catch(this.handleError);
  }

  updateNote(noteData: Note): Promise<Note> {
    return this.http.put(this.baseUrl + '/api/notes/' + noteData.id, noteData)
      .toPromise()
      .then(response => response.json() as Note)
      .catch(this.handleError);
  }

  deleteNote(id: string): Promise<any> {
    return this.http.delete(this.baseUrl + '/api/notes/' + id)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}