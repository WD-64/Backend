import Note from '../models/Note.js';
import User from '../models/User.js';

const createNote = async (req, res) => {
  try {
    const { UserId, content } = req.body;

    if (!UserId || !content)
      return res.status(400).json({ error: 'userId and content are required' });

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

const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findByPk(id, { include: User });
    if (!note) return res.status(404).json({ error: 'Note not found' });

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const {
      body: { content },
      params: { id },
    } = req;

    if (!content) return res.status(400).json({ error: 'content required' });

    const note = await Note.findByPk(id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    await note.update(req.body);

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findByPk(id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    await note.destroy();

    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createNote, getAllNotes, getNoteById, updateNote, deleteNote };
