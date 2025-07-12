import Notes from './Notes';
import contextValue from '../context/notes/NoteContext';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Home(props) {

  const navigate = useNavigate(); 

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login"); // Redirect to login if token is not present
    }
  }, [navigate]);

  const { showAlert } = props; // Extract showAlert from props

  const { addNote } = useContext(contextValue);

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" }); // Reset the form fields after submission
    props.showAlert("Note added successfully", "success"); // Show success alert
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }




  return (
    <>
      <h1 className="text-center mb-5" style={{ color: "#3433a40" }}>Welcome to iNoteBook App</h1>
      <div className="container my-4">
        <div className="row">
          <div className="col-md-4" >
            <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%", borderRadius: "12px" }}>
              <form >
                <h2 className='text-center mb-4' style={{ color: "#343a40" }}>Add a Note</h2>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    placeholder='Enter title here'
                    type="text"
                    className="form-control"
                    name="title"
                    id='title'
                    value={note.title}
                    onChange={onchange}
                    required
                    minLength={5} // Ensures title is at least 5 characters long
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    placeholder='Enter description here'
                    className="form-control"
                    rows="3"
                    name="description"
                    id='description'
                    value={note.description}
                    onChange={onchange}
                    required
                    minLength={5} // Ensures title is at least 5 characters long
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Tag</label>
                  <input
                    placeholder='Enter tag here'
                    type="text"
                    className="form-control"
                    name="tag"
                    id='tag'
                    value={note.tag}
                    onChange={onchange}
                    required
                  />
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary w-100" onClick={handleSubmit} style={{ backgroundColor: "#264653" }}>Add Note</button>
              </form>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card shadow p-4" style={{ width: "100%", borderRadius: "12px" }}>
              <h2 className='text-center mb-4' style={{ color: "#343a40" }}>Your Notes</h2>
              <Notes showAlert={showAlert} />
            </div>
          </div>
        </div>
      </div >
    </>
  );
}
