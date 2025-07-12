import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp(props) {

    let history = useNavigate();


    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    });

    const { name, email, password, cpassword } = credentials;

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (password !== cpassword) {
            props.showAlert("Passwords do not match", "danger");
            return;
        } else {
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            const json = await response.json();
            console.log(json);
            if (json.success) {
                // Save the auth token and redirect
                localStorage.setItem('token', json.authToken);
                props.showAlert("Account Created Successfully", "success");
                setTimeout(() => {
                    history("/login");
                }, 1500);
            } else {
                // Show error message
                props.showAlert("Invalid Credentials", "danger");
            }
        }
    }

    return (
        <div className="container d-flex align-items-center justify-content-center" style={{ marginTop: "25px" }}>
            <div className="card shadow p-4" style={{ maxWidth: "450px", width: "100%", borderRadius: "12px" }}>
                <h3 className="text-center mb-4" style={{ color: "#343a40" }}>SignUp to iNotebook</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name='name' value={name} onChange={onChange} placeholder="Enter your name" autoComplete="name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' value={email} onChange={onChange} placeholder="Enter your email" autoComplete="email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' value={password} onChange={onChange} placeholder="Enter your password" autoComplete="new-password" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="cpassword" name='cpassword' value={cpassword} onChange={onChange} placeholder="Enter your password" autoComplete="new-password" />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                </form>
                <div className="text-center mt-3">
                    <span>Already have an account? </span>
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
}
