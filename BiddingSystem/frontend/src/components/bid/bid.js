// src/pages/BiddingPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './bid.css';  // Import the CSS file

const BiddingPage = () => {
    const { itemId } = useParams();
    const [bidAmount, setBidAmount] = useState('');
    const [bidQuantity, setBidQuantity] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [message, setMessage] = useState('');

    const handleBidSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3001/items/${itemId}/bid`, { companyId, bidAmount })
            .then(response => setMessage('Bid placed successfully!'))
            .catch(error => setMessage('Error placing bid.'));
    };

    return (
        <div>
            <h1>Place a Bid for Item {itemId}</h1>
            <form onSubmit={handleBidSubmit}>
                <div>
                    <label>Company ID:</label>
                    <input 
                        type="text" 
                        value={companyId} 
                        onChange={(e) => setCompanyId(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Bid Amount:</label>
                    <input 
                        type="number" 
                        value={bidAmount} 
                        onChange={(e) => setBidAmount(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Bid Qty:</label>
                    <input 
                        type="number" 
                        value={bidQuantity} 
                        onChange={(e) => setBidQuantity(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Submit Bid</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default BiddingPage;
