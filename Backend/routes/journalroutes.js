const express = require("express");
const router = express.Router();

let journals = [];
let idCounter = 1;

// **CREATE**: Add a new journal entry
router.post("/", (req, res) => {
    const { title, content, date } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required" });
    }
    const newEntry = { id: idCounter++, title, content, date: date || new Date().toISOString() };
    journals.push(newEntry);
    res.status(201).json(newEntry);
});

// **READ**: Get all journal entries
router.get("/", (req, res) => {
    res.json(journals);
});

// **READ**: Get a single journal entry by ID
router.get("/:id", (req, res) => {
    const entry = journals.find(j => j.id === parseInt(req.params.id));
    if (!entry) {
        return res.status(404).json({ error: "Journal entry not found" });
    }
    res.json(entry);
});

// **UPDATE**: Update a journal entry by ID
router.put("/:id", (req, res) => {
    const entry = journals.find(j => j.id === parseInt(req.params.id));
    if (!entry) {
        return res.status(404).json({ error: "Journal entry not found" });
    }

    const { title, content, date } = req.body;
    if (title) entry.title = title;
    if (content) entry.content = content;
    if (date) entry.date = date;

    res.json(entry);
});

// **DELETE**: Delete a journal entry by ID
router.delete("/:id", (req, res) => {
    const entryIndex = journals.findIndex(j => j.id === parseInt(req.params.id));
    if (entryIndex === -1) {
        return res.status(404).json({ error: "Journal entry not found" });
    }

    journals.splice(entryIndex, 1);
    res.json({ message: "Journal entry deleted successfully" });
});

module.exports = router;
