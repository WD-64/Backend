import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from '../controllers/users.js';

const userRouter = Router();

//Option one
// userRouter.post('/', createUser);
// userRouter.get('/', getAllUsers);
// userRouter.put('/:id', updateUser);
// userRouter.delete('/:id', deleteUser);

//Option two
userRouter.route('/').post(createUser).get(getAllUsers);
userRouter.route('/:id').put(updateUser).delete(deleteUser);

export default userRouter;
