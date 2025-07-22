import express from 'express';
import { createUser } from './controllers/users.js';
import { createNote, getAllNotes } from './controllers/notes.js';

const app = express();
const port = 8080;

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello world!');
});

//User Routes
app.post('/user', createUser);

//Notes Routes
app.post('/notes', createNote);
app.get('/notes', getAllNotes);

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
