import React from 'react';
import { useContext } from 'react';
import contextValue from '../context/notes/NoteContext';

export default function NoteItems(props) {

    const { deleteNote } = useContext(contextValue);


    const { note, updateNote } = props;

    return (
        <div className="card shadow p-4 my-3" style={{ maxWidth: "400px", width: "100%", borderRadius: "12px" }}>
            <div className="card-body" style={{ color: "black" }}>
                <h5 className="card-title">{note.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
                <p className="card-text">{note.description}</p>
                <span className="float-end" >
                    <i style={{ color: "#264653" }} className="fa-duotone fa-solid fa-pen-to-square fs-3 mx-2" onClick={() => { updateNote(note) }}></i>
                    <i style={{ color: "#264653" }} className="fa-duotone fa-solid fa-trash fs-3 mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Deleted Succesfully", "success") }}></i>
                </span>
            </div>
        </div>
    );
}
