// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../src/components/home/home';
import BiddingPage from '../src/components/bid/bid';
import ModeratorPage from '../src/components/moderator/moderator';
import Header from '../src/components/header/header';  // Import the Header component

function App() {
    return (
        <Router>
            <Header />  {/* Add the Header here */}
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/bid/:itemId" element={<BiddingPage />} />
                    <Route path="/moderator" element={<ModeratorPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;