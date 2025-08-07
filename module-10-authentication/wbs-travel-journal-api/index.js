import './db/index.js';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import postsRouter from './routes/postsRouter.js';
import errorHandler from './middlewares/errorHandler.js';
import authRouter from './routes/authRouter.js';

const app = express();
const port = process.env.PORT || 8000;

//Option 1
// const origin = process.env.NODE_ENV === 'production' ? 'https://frontend.com' : 'http://localhost:5173';
// app.use(cors({ origin: origin, credentials: true }));

//Option 2
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/posts', postsRouter);
app.use('/auth', authRouter);

//Same as splat below
// app.use((req, res) => {
//   throw new Error('Page not found');
// });

app.use('*splat', (req, res) => res.status(404).json({ error: 'Not found' }));

app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
