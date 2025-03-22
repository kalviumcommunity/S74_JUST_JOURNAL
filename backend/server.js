const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection (No dotenv)
mongoose.connect(`mongodb+srv://shashankvenkatesh7906:hello@journals.wkchh.mongodb.net/?retryWrites=true&w=majority&appName=journals`)
.then(() => console.log("✅ MongoDB connected successfully"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ User Schema
const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

const UserModel = mongoose.model('User', UserSchema);

// ✅ Journal Schema
const JournalSchema = new mongoose.Schema({
    date: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true }
});

const JournalModel = mongoose.model('Journal', JournalSchema);

// ✅ Signup Route (Hashing Password)
app.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        // ✅ Validate input
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // ✅ Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // ✅ Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Save user
        const newUser = new UserModel({ email, password: hashedPassword });
        await newUser.save();

        return res.json({ message: "Signup successful" });

    } catch (err) {
        console.error("Signup error:", err);  // Log error
        return res.status(500).json({ error: "Internal server error" });
    }
});



// ✅ Login Route (Check Hashed Password)
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) return res.status(400).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid password" });

        res.json({ message: "Login successful" });
    } catch (err) {
        res.status(500).json({ error: "Error logging in" });
    }
});

// ✅ Create Journal
app.post('/createjournal', async (req, res) => {
    try {
        const { date, title, content } = req.body;
        const newJournal = new JournalModel({ date, title, content });
        await newJournal.save();
        res.json({ message: "Journal added successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error adding journal" });
    }
});

// ✅ Get All Journals
app.get('/journals', async (req, res) => {
    try {
        const journals = await JournalModel.find();
        res.json(journals);
    } catch (err) {
        res.status(500).json({ error: "Error fetching journals" });
    }
});

// ✅ Update Journal
app.put('/updatejournal/:id', async (req, res) => {
    try {
        const { date, title, content } = req.body;
        await JournalModel.findByIdAndUpdate(req.params.id, { date, title, content });
        res.json({ message: "Journal updated successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error updating journal" });
    }
});

// ✅ Delete Journal
app.delete('/journals/:id', async (req, res) => {
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
