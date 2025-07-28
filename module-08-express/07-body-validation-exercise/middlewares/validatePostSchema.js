/*
  !!!!!!!!!!!!!!!
  This file is not needed when you create a middleware factory in middlewares/validateSchema.js
  Keeping this just for comparison
*/
import postSchema from '../schemas/postSchema';
import { z } from 'zod/v4';

const validatePostSchema = (req, res, next) => {
  const { data, error } = postSchema.safeParse(req.body);

  if (error) {
    throw new Error(z.prettifyError(error), { cause: 400 });
  } else {
    next();
  }
};

export default validatePostSchema;
