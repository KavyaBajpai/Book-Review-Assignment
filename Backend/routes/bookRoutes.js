import express from 'express';
import { getAllBooks, getSingleBook, getBookByTitle } from '../controllers/BookController.js';

const booksRouter = express.Router();

booksRouter.get('/getbooks', getAllBooks);
booksRouter.get('/getbook/:bookId', getSingleBook);

booksRouter.get('/getByTitle', getBookByTitle);

export default booksRouter;
