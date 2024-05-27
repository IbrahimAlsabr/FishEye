const photographersData = require("../../data/photographers.json");
const express = require("express");
const cors = require("cors"); // Import CORS module
const app = express();
const port = 3000;

// Use CORS middleware - this applies CORS to all your routes
app.use(cors());

// Serve photographers data at a specific route
app.get("/api/photographers", cors(), (req, res) => {
    res.json(photographersData.photographers);
});

// Serve a specific photographer by ID
app.get("/api/photographerMedia/:id", cors(), (req, res) => {
    const id = parseInt(req.params.id);
    const dataByID = [];

    photographersData.media.forEach((element) => {
        element.photographerId === id ? dataByID.push(element) : null;
    });

    res.json(dataByID);
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
