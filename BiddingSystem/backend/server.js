const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
app.use(bodyParser.json());
app.use(cors())

// Mock in-memory data
let itemsForBid = [
    { id: 1, name: "Product A", description: "A sample product", quantity: 50 , isClosed: false, bids: [] },
    { id: 2, name: "Product B", description: "Another product", quantity: 20 , isClosed: false, bids: [] },
    { id: 3, name: "Product C", description: "Again sample product", quantity: 50 , isClosed: false, bids: [] },
    { id: 4, name: "Product D", description: "Again sample product", quantity: 50 , isClosed: false, bids: [] }
];

// API to list all items available for bidding
app.get('/items', (req, res) => {
    const availableItems = itemsForBid.filter(item => !item.isClosed);
    res.json(availableItems);
});

// API for a bidder to bid for an item
app.post('/items/:itemId/bid', (req, res) => {
    const { itemId } = req.params;
    const { companyId, bidAmount, bidQuantity } = req.body;

    const item = itemsForBid.find(i => i.id == itemId);

    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }

    if (item.isClosed) {
        return res.status(400).json({ message: "Bidding is closed for this item" });
    }

    if (bidQuantity > item.quantity){
        return res.status(200).json({message:"Bid quanity exceeded available quantity"})
    }

    const bid = { companyId, bidAmount, timestamp: new Date() };
    item.bids.push(bid);

    res.json({ message: "Bid placed successfully", item });
});

// API for a moderator to see all bids for an item by product ID
app.get('/moderator/items/:itemId/bids', (req, res) => {
    const { itemId } = req.params;

    const item = itemsForBid.find(i => i.id == itemId);

    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }

    res.json({ bids: item.bids });
});

// API for moderator to close bidding and select the winning company
app.post('/moderator/items/:itemId/close', (req, res) => {
    const { itemId } = req.params;
    const { winningCompanyId } = req.body;

    const item = itemsForBid.find(i => i.id == itemId);

    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }

    if (item.isClosed) {
        return res.status(400).json({ message: "Bidding already closed for this item" });
    }

    const winningBid = item.bids.find(bid => bid.companyId == winningCompanyId);

    if (!winningBid) {
        return res.status(400).json({ message: "No bid found for this company" });
    }

    // Close the bid
    item.isClosed = true;

    // Remove the item from the active items array
    itemsForBid = itemsForBid.filter(i => i.id != itemId);

    res.json({ message: "Bidding closed", winningCompanyId, winningBid });
});

// Start the server
const port = 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
