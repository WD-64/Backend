import { isValidObjectId } from 'mongoose';
import Book from '../models/Book.js';

// get all books
const getAllBooks = async (req, res) => {
  const books = await Book.find();

  if (!books.length) {
    return res.status(200).json({ msg: 'No books in the DB' });
  }

  res.status(200).json(books);
};

// create a new book
const createBook = async (req, res) => {
  // We grab exactly the keys that we have in the zod schema
  const { isbn } = req.sanitizedBody;

  const found = await Book.findOne({ isbn });

  if (found) throw new Error('Book already exists', { cause: 400 });

  const book = await Book.create(req.sanitizedBody);

  res.status(201).json(book);
};

// get one book
const getOneBook = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: 400 });

  const book = await Book.findById(id);

  if (!book) throw new Error('Book not found', { cause: 404 });

  res.status(200).json(book);
};

// update a book
const updateBook = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: 400 });

  const book = await Book.findByIdAndUpdate(id, req.sanitizedBody, {
    new: true,
  });

  if (!book) throw new Error('Book not found', { cause: 404 });

  res.status(200).json(book);
};

// delete a book
const deleteOneBook = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: 400 });

  const book = await Book.findByIdAndDelete(id);

  if (!book) throw new Error('Book not found', { cause: 404 });

  res.status(200).json({
    message: 'Book deleted successfully',
  });
};

export { getAllBooks, getOneBook, createBook, updateBook, deleteOneBook };
