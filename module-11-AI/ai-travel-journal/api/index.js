import './db/index.js';
import express from 'express';
import cors from 'cors';
import postsRouter from './routes/postsRouter.js';
import authRouter from './routes/authRouter.js';
import chatRouter from './routes/chatRouter.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
const port = process.env.PORT || 5050;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use('/posts', postsRouter);
app.use('/auth', authRouter);
app.use('/chat', chatRouter);

app.use('*splat', (req, res) => res.status(404).json({ error: 'Not found' }));
app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
