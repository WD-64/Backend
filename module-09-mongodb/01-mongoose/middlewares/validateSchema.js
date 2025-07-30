import { z } from 'zod/v4';

/*
This function is what we call a middleware factory.
It returns a middleware function based on whatever schema is being passed
 */
const validateSchema = (schema) => {
  return (req, res, next) => {
    const { data, error } = schema.safeParse(req.body);

    if (error) {
      throw new Error(z.prettifyError(error), { cause: 400 }); //This error gets caught in the errohandler function
    } else {
      //Option 1: Creates a new property in req object with sanitized data from Zod
      req.sanitizedBody = data;

      //Option 2: Overwrites entire body with sanitized data from Zod
      // req.body = data;

      //Option 3: Overwrites only the email
      // req.body.email = data.email

      next(); //This will pass control to the next middleware or request handler(controller function)
    }
  };
};

export default validateSchema;

/*
What does safeParse method do?

If validation was success, you will get this:
 {
     success: true,
     data: { firstName: 'Jane', lastName: 'Doe', email: 'jane@gmail.com' }
 }

If validation failed, you will get this:
 {
     success: false,
     error: {  } 
 }
 */
