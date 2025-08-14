import { isValidObjectId } from 'mongoose';
import Post from '../models/Post.js';

export const getAllPosts = async (req, res) => {
  const posts = await Post.find().lean().populate('author');
  res.json(posts);
};

export const createPost = async (req, res) => {
  const { sanitizedBody } = req;
  const newPost = await (await Post.create(sanitizedBody)).populate('author');
  res.status(201).json(newPost);
};

export const getSinglePost = async (req, res) => {
  const {
    params: { id }
  } = req;
  if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: 400 });
  const post = await Post.findById(id).lean().populate('author');
  if (!post) throw new Error(`Post with id of ${id} doesn't exist`, { cause: 404 });
  res.send(post);
};

export const updatePost = async (req, res) => {
  const {
    sanitizedBody: { image, title, content },
    params: { id },
    userId,
    userRole
  } = req;
  if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: 400 });

  const postInDatabase = await Post.findById(id);
  if (!postInDatabase) throw new Error(`Post with id of ${id} doesn't exist`, { cause: 404 });

  if (userId !== postInDatabase.author.toString() && userRole !== 'admin') {
    throw new Error('Not authorized', { cause: 403 });
  }

  postInDatabase.image = image;
  postInDatabase.title = title;
  postInDatabase.content = content;

  await postInDatabase.save();

  res.json(postInDatabase);
};

export const deletePost = async (req, res) => {
  const {
    params: { id },
    userId,
    userRole
  } = req;
  if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: 400 });

  const postInDatabase = await Post.findById(id);
  if (!postInDatabase) throw new Error(`Post with id of ${id} doesn't exist`, { cause: 404 });

  if (userId !== postInDatabase.author.toString() && userRole !== 'admin') {
    throw new Error('Not authorized', { cause: 403 });
  }

  await Post.findByIdAndDelete(id);
  res.json({ success: `Post with id of ${id} was deleted` });
};
