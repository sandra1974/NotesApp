package com.notesapp.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.notesapp.model.Note;
import com.notesapp.repository.NoteRepository;
import com.notesapp.model.Note;
import com.notesapp.repository.NoteRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class NoteController {

	@Autowired
    NoteRepository noteRepository;

    @GetMapping("/notes")
    public List<Note> getAllNotes() {
    	  Sort sortByCreatedAtDesc = new Sort(Sort.Direction.DESC, "createdAt");
        return noteRepository.findAll(sortByCreatedAtDesc);
    }

    @PostMapping("/notes")
    public Note createNote(@Valid @RequestBody Note note) {
        note.setCompleted(false);
        return noteRepository.save(note);
    }

    @GetMapping(value="/notes/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable("id") String id) {
        return noteRepository.findById(id)
                .map(note -> ResponseEntity.ok().body(note))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping(value="/notes/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable("id") String id,
                                           @Valid @RequestBody Note note) {
        return noteRepository.findById(id)
                .map(noteData -> {
                    noteData.setTitle(note.getTitle());
                    noteData.setCompleted(note.getCompleted());
                    Note updatedNote = noteRepository.save(noteData);
                    return ResponseEntity.ok().body(updatedNote);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping(value="/notes/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable("id") String id) {
        return noteRepository.findById(id)
                .map(note -> {
                    noteRepository.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}