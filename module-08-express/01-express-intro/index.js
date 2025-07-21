import express from 'express';

//Imagine the follwoing data comes from a Database
const blogPosts = [
  { id: 1, title: 'Post one' },
  { id: 2, title: 'Post two' },
  { id: 3, title: 'Post three' },
];

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello world!');
});
app.get('/blogposts', (req, res) => {
  res.json(blogPosts);
});

//Dynamic Route
app.get('/blogposts/:id', (req, res) => {
  const post = blogPosts.find((singlePost) => singlePost.id === +req.params.id);

  //Send a different reponse and status code when post does not exist
  if (!post) res.status(404).json({ message: 'Post not found!' });

  res.json(post);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
