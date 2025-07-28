import { Router } from 'express';
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from '../controllers/posts.js';
import validateSchema from '../middlewares/validateSchema.js';
import postSchema from '../schemas/postSchema.js';

const postRouter = Router();

postRouter
  .route('/')
  .get(getPosts)
  .post(validateSchema(postSchema), createPost);
postRouter
  .route('/:id')
  .get(getPostById)
  .put(validateSchema(postSchema), updatePost)
  .delete(deletePost);

export default postRouter;
