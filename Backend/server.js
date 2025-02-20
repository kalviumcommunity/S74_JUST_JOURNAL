const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const journalRoutes = require("./routes/journalroutes");
app.use("/api/journals", journalRoutes); // API endpoint for journals

// Root route (optional)
app.get("/", (req, res) => {
    res.send("Welcome to the Journaling App API");
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
