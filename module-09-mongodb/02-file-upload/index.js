import express from 'express';
import upload from './middlewares/upload.js';
import { uploadController } from './controllers/uploadController.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.post('/upload', upload.single('profileImg'), uploadController);

app.use((err, req, res, next) => {
  res.json({ error: err.message });
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
