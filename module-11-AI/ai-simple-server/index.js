import cors from 'cors';
import express from 'express';
import './db/index.js';
import chatRouter from './routers/chatRouter.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
const port = process.env.PORT || 5050;

app.use(cors({ origin: '*' }), express.json());
app.use('/chat', chatRouter);

app.use('*splat', (req, res) => res.status(404).json({ error: 'Route not found' }));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
