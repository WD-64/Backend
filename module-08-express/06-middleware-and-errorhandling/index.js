import express from 'express';
import './db/associations.js';
import userRouter from './routes/userRoutes.js';
import postRouter from './routes/postRoutes.js';
import middleware from './middlewares/middleware.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json()); //Application level middleware
// app.use(middleware); //Application level middleware
app.use('/users', userRouter);
app.use('/posts', postRouter);

app.use((req, res) => {
  throw new Error('Page not found');
});
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
