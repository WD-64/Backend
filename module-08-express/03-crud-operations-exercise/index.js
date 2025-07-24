import express from 'express';
import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from './controllers/users.js';
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from './controllers/notes.js';

const app = express();
const port = 8080;

app.use(express.json());

// The below endpoint was just to test. We can delete it
// app.get('/', (req, res) => {
//   res.send('Hello world!');
// });

//User Routes
app.post('/user', createUser);
app.get('/users', getAllUsers);
app.put('/user/:id', updateUser);
app.delete('/user/:id', deleteUser);

//Notes Routes
app.post('/notes', createNote);
app.get('/notes', getAllNotes);
app.get('/notes/:id', getNoteById);
app.put('/notes/:id', updateNote);
app.delete('/notes/:id', deleteNote);

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
