import express from 'express';
import './db/associations.js';
import userRouter from './routes/userRoutes.js';
import postRouter from './routes/postRoutes.js';
import middleware from './middlewares/middleware.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json()); //Application level middleware
// app.use(middleware); //Application level middleware
app.use('/users', userRouter);
app.use('/posts', postRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));
