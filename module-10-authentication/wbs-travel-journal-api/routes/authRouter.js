import { Router } from 'express';
import { me, signIn, signOut, signUp } from '../controllers/auth.js';
import validateZod from '../middlewares/validateZod.js';
import verifyToken from '../middlewares/verifyToken.js';
import { userSchema, signInSchema } from '../zod/schemas.js';

const authRouter = Router();

authRouter.post('/signin', validateZod(signInSchema), signIn);
authRouter.post('/signup', validateZod(userSchema), signUp);
authRouter.delete('/signout', signOut);
authRouter.get('/me', verifyToken, me);

export default authRouter;
