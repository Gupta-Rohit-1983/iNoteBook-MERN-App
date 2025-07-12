import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {

    let location = useLocation();

    let navigate = useNavigate();

    useEffect(() => {

    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from localStorage
        navigate("/login"); // Redirect to login page
    }

    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg" style={{ backgroundColor: '#008080' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand text-white" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className={`nav-link text-white ${location.pathname === "/" ? "active-li" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link text-white ${location.pathname === "/about" ? "active-li" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto">
                            {!localStorage.getItem('token') ? (
                                <>
                                    <li className="nav-item">
                                        <Link className={`nav-link text-white ${location.pathname === "/login" ? "active-li" : ""}`} aria-current="page" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link text-white ${location.pathname === "/signup" ? "active-li" : ""}`} to="/signup">Sign Up</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className={`nav-link text-white ${location.pathname === "/profile" ? "active-li" : ""}`} to="/profile" >Profile</Link>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className="nav-link text-white btn"
                                            style={{ backgroundColor: '#008080', border: 'none' }}
                                            onClick={handleLogout} >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
