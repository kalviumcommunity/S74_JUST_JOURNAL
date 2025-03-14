import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    maxlength: 300, // Limit journal entries to 300 characters
  },
  date: {
    type: Date,
    default: Date.now, // Default to current date
  },
});

const Journal = mongoose.model("Journal", journalSchema);

export default Journal;
