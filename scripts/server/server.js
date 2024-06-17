import express from "express";
import cors from "cors";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Now, use __dirname as you would in a CommonJS module
const data = JSON.parse(
    fs.readFileSync(`${__dirname}/../../data/photographers.json`, "utf8")
);
const { photographers, media } = data;

const app = express();
const port = process.env.PORT || 3000; // Use the PORT environment variable

app.use(cors()); // Apply CORS to all routes

// Serve photographers data
app.get("/api/photographers", cors(), (req, res) => {
    res.json(photographers);
});

// Serve specific photographer by ID
app.get("/api/photographerMedia/:id", cors(), (req, res) => {
    const id = parseInt(req.params.id);
    const dataByID = media.filter((item) => item.photographerId === id);
    res.json(dataByID);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
