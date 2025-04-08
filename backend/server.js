const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const UserModel = require("./models/UserSchema");
const JournalModel = require("./models/JournalSchema");

const app = express();
app.use(cors({
    origin: "http://localhost:3000", // frontend origin
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// 🔐 JWT secret
const JWT_SECRET = "shashank_super_secret_journal_key";

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

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ email, password: hashedPassword });
        await newUser.save();

        res.json({ message: "Signup successful" });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ✅ Login Route with JWT and Cookie
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid password" });

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

        // Set token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production with HTTPS
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.json({ message: "Login successful", userId: user._id });
    } catch (err) {
        res.status(500).json({ error: "Error logging in" });
    }
});

// ✅ Middleware to verify JWT from cookie
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

// ✅ Get All Users (For Dropdown)
app.get("/users", async (req, res) => {
    try {
        const users = await UserModel.find({}, "email");
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Error fetching users" });
    }
});

// ✅ Create Journal (Protected Route)
app.post("/createjournal", verifyToken, async (req, res) => {
    try {
        const { date, title, content } = req.body;
        const newJournal = new JournalModel({ userId: req.userId, date, title, content });
        await newJournal.save();
        res.json({ message: "Journal added successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error adding journal" });
    }
});

// ✅ Get Journals by Logged-in User
app.get("/journals", verifyToken, async (req, res) => {
    try {
        const journals = await JournalModel.find({ userId: req.userId });
        res.json(journals);
    } catch (err) {
        res.status(500).json({ error: "Error fetching journals" });
    }
});

// ✅ Update Journal
app.put("/updatejournal/:id", verifyToken, async (req, res) => {
    try {
        const { date, title, content } = req.body;
        await JournalModel.findByIdAndUpdate(req.params.id, { date, title, content });
        res.json({ message: "Journal updated successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error updating journal" });
    }
});

// ✅ Delete Journal
app.delete("/journals/:id", verifyToken, async (req, res) => {
    try {
        await JournalModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Journal deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting journal" });
    }
});

// ✅ Logout Route
app.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
