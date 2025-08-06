import { Router } from 'express';
import { signIn, signOut, signUp } from '../controllers/auth.js';
import validateZod from '../middlewares/validateZod.js';
import { userSchema, signInSchema } from '../zod/schemas.js';

const authRouter = Router();

authRouter.post('/signin', validateZod(signInSchema), signIn);
authRouter.post('/signup', validateZod(userSchema), signUp);
authRouter.delete('/signout', signOut);

export default authRouter;
