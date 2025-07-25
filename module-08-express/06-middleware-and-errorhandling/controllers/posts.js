import Post from '../models/Post.js';
import User from '../models/User.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const getPosts = async (req, res) => {
  const posts = await Post.findAll({ include: User });

  if (!posts.length) throw new ErrorResponse('No posts available', 404);

  res.json(posts);
};

const createPost = async (req, res) => {
  const {
    body: { title, content, userId },
  } = req;

  if (!title || !content || !userId)
    throw new ErrorResponse('Title, content and userId are required', 400);

  const post = await Post.create(req.body);
  const user = await post.getUser();
  post.dataValues.user = user;

  res.json(post);
};

const getPostById = async (req, res) => {
  const {
    params: { id },
  } = req;

  const post = await Post.findByPk(id, { include: User });
  if (!post) throw new ErrorResponse('Post not found', 404);

  res.json(post);
};

const updatePost = async (req, res) => {
  const {
    body: { title, content, userId },
    params: { id },
  } = req;

  if (!title || !content || !userId)
    throw new ErrorResponse('title, content, and userId are required', 400);

  const post = await Post.findByPk(id);
  if (!post) throw new ErrorResponse('Post not found', 404);
  await post.update(req.body);
  const user = await post.getUser();
  post.dataValues.user = user;

  res.json(post);
};

const deletePost = async (req, res) => {
  const {
    params: { id },
  } = req;

  const post = await Post.findByPk(id);
  if (!post) throw new ErrorResponse('Post not found', 404);
  await post.destroy();

  res.json({ message: 'Post deleted' });
};

export { createPost, getPostById, getPosts, updatePost, deletePost };
