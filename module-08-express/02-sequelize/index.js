import express from 'express';
import {
  getAllPosts,
  getSinglePost,
  createPost,
} from './controllers/blogpost.js';

const app = express();
const port = 8080;

app.use(express.json()); //Middleware: Converts all incoming JSON to JS.
//Middleware will be covered in another lecture, so for now just blindly copy the above line

app.get('/', (req, res) => {
  res.send('Hello world!');
});
app.get('/blogposts', getAllPosts);
app.post('/blogposts', createPost);

//Dynamic Route
app.get('/blogposts/:id', getSinglePost);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
