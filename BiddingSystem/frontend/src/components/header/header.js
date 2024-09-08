// src/components/Header.js
import React from 'react';
import './header.css'; // Import the CSS file
const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <a href="/">Schwarz IT Bidding System</a>
            </div>
            <nav className="nav-links">
                <a href="/">Home</a>
                <a href="/moderator">Moderator</a>
                <a href="/bid">Place a Bid</a>
            </nav>
        </header>
    );
};

export default Header;
