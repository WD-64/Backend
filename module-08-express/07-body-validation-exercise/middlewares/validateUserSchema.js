/*
  !!!!!!!!!!!!!!!
  This file is not needed when you create a middleware factory in middlewares/validateSchema.js
  Keeping this just for comparison
*/
import userSchema from '../schemas/userSchema.js';
import { z } from 'zod/v4';

const validateUserSchema = (req, res, next) => {
  const { data, error } = userSchema.safeParse(req.body);

  if (error) {
    throw new Error(z.prettifyError(error), { cause: 400 }); //This error gets caught in the errohandler function
  } else {
    next(); //This will pass control to the next middleware or request handler(controller function)
  }
};

export default validateUserSchema;
