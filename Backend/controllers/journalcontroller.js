// controllers/journalController.js

import Journal from '../models/journal';

// ➕ Create Journal Entry
export const createJournal = async (req, res) => {
  try {
    const journal = new Journal(req.body);
    await journal.save();
    res.status(201).json(journal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 📥 Get All Journals
export const getAllJournals = async (req, res) => {
  try {
    const journals = await Journal.find();
    res.status(200).json(journals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔍 Get Single Journal by ID
export const getJournalById = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);
    if (!journal) return res.status(404).json({ message: 'Journal not found' });
    res.status(200).json(journal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✏️ Update Journal Entry
export const updateJournal = async (req, res) => {
  try {
    const journal = await Journal.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!journal) return res.status(404).json({ message: 'Journal not found' });
    res.status(200).json(journal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 🗑️ Delete Journal Entry
export const deleteJournal = async (req, res) => {
  try {
    const journal = await Journal.findByIdAndDelete(req.params.id);
    if (!journal) return res.status(404).json({ message: 'Journal not found' });
    res.status(200).json({ message: 'Journal deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
