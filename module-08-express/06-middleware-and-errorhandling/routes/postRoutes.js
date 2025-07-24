import { Router } from 'express';
import {
  createPost,
  getPostById,
  getPosts,
  updatePost,
  deletePost,
} from '../controllers/posts.js';
import verifyAdmin from '../middlewares/verifyAdmin.js';
import middleware from '../middlewares/middleware.js';

const postRouter = Router();

// postRouter.get('/posts', getPosts);
// postRouter.post('/posts', verifyAdmin, middleware, createPost);
// postRouter.get('/posts/:id', getPostById);
// postRouter.put('/posts/:id', updatePost);
// postRouter.delete('/posts/:id', deletePost);

postRouter.route('/').get(getPosts).post(verifyAdmin, createPost);
postRouter.route('/:id').get(getPostById).put(updatePost).delete(deletePost);

export default postRouter;
