
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import booksRouter from '../routes/bookRoutes.js';
import userRouter from '../routes/userRoutes.js';
import reviewsRouter from '../routes/reviewRoutes.js';

dotenv.config(); 

const app = express();

// Middleware


app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/api/books', booksRouter);
app.use('/api/user', userRouter);
app.use('/api/reviews', reviewsRouter)



export default app;

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server is listening on port ${PORT}`);
});
