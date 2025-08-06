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
    sanitizedBody,
    params: { id }
  } = req;
  if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: 400 });
  const updatedPost = await Post.findByIdAndUpdate(id, sanitizedBody, { new: true }).populate('author');
  if (!updatedPost) throw new Error(`Post with id of ${id} doesn't exist`, { cause: 404 });
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const {
    params: { id }
  } = req;
  if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: 400 });
  const deletedPost = await Post.findByIdAndDelete(id).populate('author');
  if (!deletedPost) throw new Error(`Post with id of ${id} doesn't exist`, { cause: 404 });
  res.json({ success: `Post with id of ${id} was deleted` });
};
