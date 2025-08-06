import { Router } from 'express';
import validateZod from '../middlewares/validateZod.js';
import verifyToken from '../middlewares/verifyToken.js';
import { createPost, deletePost, getAllPosts, getSinglePost, updatePost } from '../controllers/posts.js';
import { postSchema } from '../zod/schemas.js';

const postsRouter = Router();

//We use the verifyToken middleware on any endpoint and HTTP method that requires an authenticated user

postsRouter.route('/').get(getAllPosts).post(verifyToken, validateZod(postSchema), createPost);

postsRouter
  .route('/:id')
  .get(getSinglePost)
  .put(verifyToken, validateZod(postSchema), updatePost)
  .delete(verifyToken, deletePost);

export default postsRouter;
