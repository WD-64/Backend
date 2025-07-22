import Note from '../models/Note.js';
import User from '../models/User.js';

const createNote = async (req, res) => {
  try {
    const newNote = await Note.create(req.body);
    res.json(newNote);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllNotes = async (req, res) => {
  try {
    // const allNotes = await Note.findAll({ include: User });
    const allNotes = await Note.findAll({
      include: [{ model: User, attributes: ['firstName', 'email'] }], // If you want to just include firstName and email for example
    });
    res.json(allNotes);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { createNote, getAllNotes };
