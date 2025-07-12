import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ user }) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/login");
        }
    }, [navigate]);

    if (!user) {
        return (
            <div className="alert alert-warning text-center my-4">
                No user data available.
            </div>
        );
    }


    return (
        <div className="container d-flex justify-content-center">
            <div
                className="card shadow-lg"
                style={{
                    backgroundColor: "#f8f9fa",
                    borderColor: "#008080",
                    maxWidth: "700px", // Increased from 700px to 900px
                    width: "100%",
                    borderRadius: "1rem",
                    padding: "2rem 2.5rem"
                }}
            >
                <div className="card-header text-white d-flex align-items-center" style={{ borderRadius: "0.75rem 0.75rem 0 0", padding: "1.5rem 1rem", backgroundColor: "#264653 " }}>
                    <span role="img" aria-label="Notebook" style={{ fontSize: "2.5rem", marginRight: "18px" }}>📝</span>
                    <h2 className="mb-0" style={{ letterSpacing: "1px" }}>User Profile</h2>
                </div>
                <div className="card-body" style={{ padding: "2rem 1.5rem" }}>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item" style={{ marginBottom: "1rem" }}>
                            <strong>Name:</strong> {user.name || 'N/A'}
                        </li>
                        <li className="list-group-item" style={{ marginBottom: "1rem" }}>
                            <strong>Email:</strong> {user.email || 'N/A'}
                        </li>
                        <li className="list-group-item" style={{ marginBottom: "1rem" }}>
                            <strong>Username:</strong> {user.username || 'N/A'}
                        </li>
                        {/* Add more fields as needed */}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Profile;