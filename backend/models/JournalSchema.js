const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link journal to user
    date: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true }
});

const JournalModel = mongoose.model("Journal", JournalSchema);
module.exports = JournalModel;
