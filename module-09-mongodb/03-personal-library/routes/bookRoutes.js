import { Router } from 'express';
import validateBody from '../middleware/validateBody.js';
import { bookSchema } from '../schemas/schemas.js';

import {
  getAllBooks,
  getOneBook,
  createBook,
  updateBook,
  deleteOneBook,
} from '../controllers/books.js';

const bookRouter = Router();

bookRouter
  .route('/')
  .get(getAllBooks)
  .post(validateBody(bookSchema), createBook);

bookRouter
  .route('/:id')
  .get(getOneBook)
  .put(validateBody(bookSchema), updateBook)
  .delete(deleteOneBook);

export default bookRouter;
