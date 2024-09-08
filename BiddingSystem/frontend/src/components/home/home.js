// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css';  // Import the CSS file

const HomePage = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/items')
            .then(response => setItems(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <h1>Available Items for Bid</h1>
            <div className="item-list">
                {items.map(item => (
                    <div key={item.id} className="item">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>{item.quantity}</p>
                        <button onClick={() => window.location.href = `/bid/${item.id}`}>Place a Bid</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
