// src/pages/ModeratorPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './moderator.css'; // Import the CSS file

const ModeratorPage = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [bids, setBids] = useState([]);
    const [winningCompanyId, setWinningCompanyId] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/items')
            .then(response => setItems(response.data))
            .catch(error => console.log(error));
    }, []);

    const viewBids = (itemId) => {
        axios.get(`http://localhost:3001/moderator/items/${itemId}/bids`)
            .then(response => {
                setBids(response.data.bids);
                setSelectedItem(itemId);
            })
            .catch(error => console.log(error));
    };

    const closeBidding = (itemId) => {
        axios.post(`http://localhost:3001/moderator/items/${itemId}/close`, { winningCompanyId })
            .then(response => alert('Bidding closed successfully!'))
            .catch(error => console.log(error));
    };

    return (
        <div>
            <h1>Moderator Dashboard</h1>
            <h2>Items for Bid</h2>
            <div className="item-list">
                
                {items.map(item => (
                    <div key={item.id} className="item">
                        <h3>{item.name}</h3>
                        <button onClick={() => viewBids(item.id)}>View Bids</button>
                    </div>
                ))}
            </div>
            {selectedItem && (
                <div>
                    <h2>Bids for Item {selectedItem}</h2>
                    <ul>
                        {bids.map((bid, index) => (
                            <li key={index}>Company: {bid.companyId}, Bid: {bid.bidAmount}</li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        value={winningCompanyId}
                        onChange={(e) => setWinningCompanyId(e.target.value)}
                        placeholder="Winning Company ID"
                    />
                    <button className="close-bidding-button" onClick={() => closeBidding(selectedItem)}>
                        Close Bidding
                    </button>
                </div>
            )}
        </div>
    );
};

export default ModeratorPage;
