import { Router } from 'express';
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/users.js';
import middleware from '../middlewares/middleware.js';

const userRouter = Router();

userRouter.route('/').get(getUsers).post(createUser);
userRouter
  .route('/:id')
  .get(middleware, getUserById) //Route level middleware
  .put(updateUser)
  .delete(deleteUser);

export default userRouter;
