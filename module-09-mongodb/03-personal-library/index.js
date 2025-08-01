import express from 'express';
import './db/index.js';
import userRouter from './routes/userRoutes.js';
import bookRouter from './routes/bookRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(express.json());

const port = process.env.PORT || 8080;

app.use('/users', userRouter);
app.use('/books', bookRouter);

app.use('*splat', (req, res) => {
  throw new Error('Not found', { cause: 404 });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
