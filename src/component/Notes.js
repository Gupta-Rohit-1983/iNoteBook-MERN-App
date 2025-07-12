import contextValue from '../context/notes/NoteContext';
import { useContext, useEffect, useState, useRef } from 'react';
import NoteItems from './NoteItems';
import { useNavigate } from 'react-router-dom';

export default function Notes(props) {
    const {showAlert} = props;

    let navigate = useNavigate();
    // eslint-disable-next-line

   

    const {notes, getAllNotes, editNote } = useContext(contextValue);

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getAllNotes();
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click(); // Close the modal after updating
        setTimeout(() => {
            ref.current.focus(); // Move focus to a safe element outside the modal
        }, 0);
        props.showAlert("Note updated successfully", "success");
    };


    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content"><div className="container d-flex align-items-center justify-content-center">
                        <div className="card shadow p-4" style={{ maxWidth: "500px", width: "100%", borderRadius: "12px" }}>
                            <div className="modal-header">
                                <h5 className="modal-title text-dark" id="staticBackdropLabel">Edit Note</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form >
                                    <div className="mb-3">
                                        <label className="form-label">Title</label>
                                        <input
                                            placeholder='Enter title here'
                                            type="text"
                                            className="form-control"
                                            name="etitle"
                                            id='etitle'
                                            value={note.etitle}
                                            onChange={onchange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            placeholder='Enter description here'
                                            className="form-control"
                                            rows="3"
                                            name="edescription"
                                            id='edescription'
                                            value={note.edescription}
                                            onChange={onchange}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Tag</label>
                                        <input
                                            placeholder='Enter tag here'
                                            type="text"
                                            className="form-control"
                                            name="etag"
                                            id='etag'
                                            value={note.etag}
                                            onChange={onchange}
                                            required
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button style={{backgroundColor: "#264653"}} disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleSubmit}>Update Note</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className="row">
                {notes.length === 0 ? (<p>No notes added yet.</p>) : (
                    notes.map((note) => (
                        <div className="col-md-6" key={note._id}>
                            <NoteItems note={note} updateNote={updateNote} showAlert={showAlert} />
                        </div>
                    ))
                )}
            </div>
        </>
    );
}
