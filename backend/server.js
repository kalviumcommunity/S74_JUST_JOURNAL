const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Journalmodel = require("./Model/Journalmodel");

const app = express();
const port = 3001;

// Middleware
app.use(express.json()); // Allows JSON body parsing
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb+srv://shashankvenkatesh7906:hello@journals.wkchh.mongodb.net/?retryWrites=true&w=majority&appName=journals")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("DB connection Error:", err));

// Routes

// Get all journals
app.get('/', async (req, res) => {
    try {
        const journals = await Journalmodel.find({});
        res.status(200).json(journals);
    } catch (err) {
        res.status(500).json({ error: "Error fetching journals", details: err.message });
    }
});

// Create a new journal
app.post('/createjournal', async (req, res) => {
    try {
        const { date, title, content } = req.body;
        const newJournal = await Journalmodel.create({ date, title, content });
        res.status(201).json(newJournal);
    } catch (err) {
        res.status(500).json({ error: "Error creating journal", details: err.message });
    }
});

app.get('/journals/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const journal = await Journalmodel.findById(id);

        if (!journal) {
            return res.status(404).json({ error: "Journal not found" });
        }

        res.status(200).json(journal);
    } catch (err) {
        res.status(500).json({ error: "Error fetching journal", details: err.message });
    }
});


// Update a journal by ID
app.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { date, title, content } = req.body;

        const updatedJournal = await Journalmodel.findByIdAndUpdate(
            id,
            { date, title, content },
            { new: true } // Return the updated document
        );

        if (!updatedJournal) {
            return res.status(404).json({ error: "Journal not found" });
        }

        res.status(200).json(updatedJournal);
        console.log('weeeee')
    } catch (err) {
        res.status(500).json({ error: "Error updating journal", details: err.message });
    }
});


app.delete('/journals/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedJournal = await Journalmodel.findByIdAndDelete(id);

        if (!deletedJournal) {
            return res.status(404).json({ error: "Journal not found" });
        }

        res.status(200).json({ message: "Journal deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting journal", details: err.message });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server running @ port ${port}`);
});
