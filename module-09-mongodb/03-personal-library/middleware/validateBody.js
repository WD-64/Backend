import { z } from 'zod/v4';

const validateBody = zodSchema => (req, res, next) => {
  const { data, error } = zodSchema.safeParse(req.body);
  if (error) {
    next(new Error(z.prettifyError(error), { cause: 400 }));
  } else {
    req.sanitizedBody = data;
    next();
  }
};

export default validateBody;
