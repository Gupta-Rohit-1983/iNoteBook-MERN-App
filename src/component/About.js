import React from 'react';

export default function About() {
return (
    <div className="container d-flex justify-content-center">
        <div
            className="card shadow-lg"
            style={{
                backgroundColor: "#f8f9fa",
                borderColor: "#008080",
                maxWidth: "1200px", // Increased from 700px to 900px
                width: "100%",
                borderRadius: "1rem",
                padding: "2rem 2.5rem"
            }}
        >
            <div className="card-header text-white d-flex align-items-center" style={{ borderRadius: "0.75rem 0.75rem 0 0", padding: "1.5rem 1rem", backgroundColor: "#264653 " }}>
                <span role="img" aria-label="Notebook" style={{ fontSize: "2.5rem", marginRight: "18px" }}>📝</span>
                <h2 className="mb-0" style={{ letterSpacing: "1px" }}>About iNotebook</h2>
            </div>
            <div className="card-body" style={{ padding: "2rem 1.5rem" }}>
                <p className="card-text" style={{ fontSize: "1.15rem", marginBottom: "1.5rem" }}>
                    <strong>iNotebook</strong> is a modern, secure, and user-friendly note-taking application built with React and styled using Bootstrap 5. It is designed to help you manage your notes efficiently, whether you are a student, professional, or anyone who needs to organize information.
                </p>
                <ul style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
                    <li style={{ marginBottom: "1rem" }}>🗂️ <strong>Organize Notes:</strong> Create, edit, and categorize your notes to keep your thoughts and ideas structured and easy to find.</li>
                    <li style={{ marginBottom: "1rem" }}>🔒 <strong>Secure Access:</strong> Your notes are protected and can only be accessed by you, ensuring privacy and security across all your devices.</li>
                    <li style={{ marginBottom: "1rem" }}>💻 <strong>Responsive Design:</strong> The app features a clean and modern interface that adapts seamlessly to desktops, tablets, and mobile devices.</li>
                    <li style={{ marginBottom: "1rem" }}>⚡ <strong>Fast & Intuitive:</strong> Enjoy a smooth and efficient experience with quick navigation and easy-to-use features.</li>
                    <li style={{ marginBottom: "1rem" }}>☁️ <strong>Cloud Sync:</strong> Access your notes anytime, anywhere, with automatic synchronization across devices.</li>
                    <li style={{ marginBottom: "1rem" }}>🎨 <strong>Customizable Themes:</strong> Match the app’s appearance with your preferences, including a theme that aligns with the navbar for a cohesive look.</li>
                </ul>
                <p style={{ fontSize: "1.1rem" }}>
                    <span role="img" aria-label="Rocket">🚀</span> <strong>Get Started:</strong> Begin using <strong>iNotebook</strong> today to keep your important notes organized, secure, and always within reach!
                </p>
            </div>
        </div>
    </div>
);
}
