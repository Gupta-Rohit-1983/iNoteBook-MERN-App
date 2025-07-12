import React from 'react';

function Footer() {
    return (
        <footer style={{
            backgroundColor: '#f8f9fa',
            textAlign: 'center',
            padding: '1rem 0',
            position: 'fixed',
            left: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e7e7e7'
        }}>
            <span>&copy; {new Date().getFullYear()} iNotebook. All rights reserved.</span>
        </footer>
    );
}

export default Footer;