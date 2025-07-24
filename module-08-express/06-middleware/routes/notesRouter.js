import { Router } from 'express';
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from '../controllers/notes.js';

const notesRouter = Router();

//Option one
// notesRouter.post('/', createNote);
// notesRouter.get('/', getAllNotes);
// notesRouter.get('/:id', getNoteById);
// notesRouter.put('/:id', updateNote);
// notesRouter.delete('/:id', deleteNote);

//Option two
notesRouter.route('/').post(createNote).get(getAllNotes);
notesRouter.route('/:id').get(getNoteById).put(updateNote).delete(deleteNote);

export default notesRouter;
