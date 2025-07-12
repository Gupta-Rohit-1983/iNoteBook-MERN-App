import React, { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {

    const initialNotes = []

    const [notes, setNotes] = useState(initialNotes);

    const getAllNotes = async () => {
        const response = await fetch("http://localhost:5000/api/notes/fetchallnotes", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') 
            }
        });
        const json = await response.json();
        setNotes(json);
    }


    // Add a Note
    const addNote = async (title, description, tag) => {
        // API call to add a note
        const response = await fetch("http://localhost:5000/api/notes/addnote", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') 
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        // Update the state with the new note
        setNotes(notes.concat(json));
    }


    // Delete a Note
    const deleteNote = async (id) => {
        // API call to delete a note
        const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') 
            }
        });
        const json = await response.json();
        console.log(json);
        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
    }


    // Update a Note
    const editNote = async (id, title, description, tag) => {
        // API call to update a note
        const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') 
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json);
        // Update the note in the state
        // Map through the notes and update the one with the given id
        const updatedNotes = notes.map((note) => {
            if (note._id === id) {
                return { ...note, title, description, tag };
            }
            return note;
        }
        );
        // Update the state with the updated notes array
        setNotes(updatedNotes);
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;