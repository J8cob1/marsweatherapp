// File: index.js
// Date: 5/18/2020
// Purpose: the node.js server file for the mars weather app

// Load up depdendencies and set variables
const express = require('express');
const app = express();

// Variables and Middleware
const port = 5000;

// Common Functions
function setHeadersAndSuch(res) {
    res.status(200);
    res.set({ 'Content-Type': 'text/html' });
}

// Routing
// Need to make for / and /current
app.get('/', (req, res) => {
    setHeadersAndSuch(res);
    res.send("Current Weather Page");
});

app.get('/7dayhistory', (req, res) => {
    setHeadersAndSuch(res);
    res.send("7 Day History");
});

app.get('/charthistory', (req, res) => {
    setHeadersAndSuch(res);
    res.send("Chart History");
});

// Need an error route
// Logging

// Start listening
app.listen(port, () => {
    console.log("Server running at port " + port);
});