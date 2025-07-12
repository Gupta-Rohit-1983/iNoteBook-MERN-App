import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login(props) {

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            await props.fetchUser(); // Fetch and set user in App.js
            navigate("/");
            props.showAlert("Logged in Successfully", "success");
        } else {
            // Show error message
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className="container d-flex align-items-center justify-content-center" style={{ marginTop: "100px" }}>
            <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%", borderRadius: "12px" }}>
                <h3 className="text-center mb-4" style={{ color: "#343a40" }}>Login to iNotebook</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label" style={{ color: "#495057" }}>Email address</label>
                        <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} placeholder="Enter email" autoComplete="username" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label" style={{ color: "#495057" }}>Password</label>
                        <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} placeholder="Password" autoComplete="current-password" required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" style={{ borderRadius: "8px" }}>Login</button>
                </form>
                <div className="text-center mt-3">
                    <span>New to iNoteBook ? </span>
                    <Link to="/signup">Create an account</Link>
                </div>
            </div>
        </div>
    );
}
