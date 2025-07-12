import './App.css';

import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import Login from './component/Login';
import SignUp from './component/SignUp';
import Alert from './component/Alert';
import Footer from './component/Footer';
import Profile from './component/Profile';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import NoteState from './context/notes/NoteState';

function App() {

  const [alert, setAlert] = useState(null);

  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setUser(null);
      return;
    }
    const response = await fetch("http://localhost:5000/api/auth/getuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token // Include the token in the request headers
      }
    });
    const json = await response.json();
    console.log(json);
    setUser(json); // Set the user data in state
  };

  useEffect(() => {
    fetchUser(); // Fetch user data on initial load
  }, []);


  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }



  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div style={{ marginTop: "50px" }}>
            <Alert alert={alert} />
          </div>
          <div className='container' style={{ marginTop: "25px", marginBottom: "100px" }}>
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login showAlert={showAlert} fetchUser={fetchUser}/>} />
              <Route path="/signup" element={<SignUp showAlert={showAlert} />} />
              <Route path="/profile" element={<Profile user={user} />} />
            </Routes>
          </div>
        </Router>
        <Footer />
      </NoteState>
    </>
  );
}

export default App;
