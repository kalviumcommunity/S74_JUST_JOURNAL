const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const UserModel = require("./models/UserSchema"); // ✅ Corrected path
const JournalModel = require("./models/JournalSchema"); // ✅ Corrected path

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(`mongodb+srv://shashankvenkatesh7906:hello@journals.wkchh.mongodb.net/?retryWrites=true&w=majority&appName=journals`)
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Signup Route
app.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "User already exists" });
            console.log("User already exists")

        const newUser = new UserModel({ email, password });
        await newUser.save();
            console.log(`newUser`)
        

        return res.json({ message: "Signup successful" });
    } catch (err) {
        console.error("Signup error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// ✅ Login Route
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) return res.status(400).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid password" });

        res.json({ message: "Login successful", userId: user._id });
    } catch (err) {
        res.status(500).json({ error: "Error logging in" });
    }
});

// ✅ Get All Users (For Dropdown)
app.get("/users", async (req, res) => {
    try {
        const users = await UserModel.find({}, "email"); // Fetch only emails
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Error fetching users" });
    }
});

// ✅ Create Journal (Include userId)
app.post("/createjournal", async (req, res) => {
    try {
        const { userId, date, title, content } = req.body;
        if (!userId) return res.status(400).json({ error: "User ID is required" });

        const newJournal = new JournalModel({ userId, date, title, content });
        await newJournal.save();
        res.json({ message: "Journal added successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error adding journal" });
    }
});

// ✅ Get Journals by User ID
app.get("/journals/:userId", async (req, res) => {
    try {
        const journals = await JournalModel.find({ userId: req.params.userId });
        res.json(journals);
    } catch (err) {
        res.status(500).json({ error: "Error fetching journals" });
    }
});

// ✅ Update Journal
app.put("/updatejournal/:id", async (req, res) => {
    try {
        const { date, title, content } = req.body;
        await JournalModel.findByIdAndUpdate(req.params.id, { date, title, content });
        res.json({ message: "Journal updated successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error updating journal" });
    }
});

// ✅ Delete Journal
app.delete("/journals/:id", async (req, res) => {
    try {
        await JournalModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Journal deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting journal" });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
