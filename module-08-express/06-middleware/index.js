import express from 'express';
import notesRouter from './routes/notesRouter.js';
import userRouter from './routes/userRouter.js';

const app = express();
const port = 8080;

app.use(express.json());

app.use('/users', userRouter);
app.use('/notes', notesRouter);

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
