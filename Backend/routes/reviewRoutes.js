import express from 'express';
import { addReview, updateReview, deleteReview, getAllReviews } from '../controllers/ReviewController.js';
import { userAuth } from '../middlewares/userAuth.js';
const reviewsRouter = express.Router();


reviewsRouter.post('/add', userAuth, addReview);
reviewsRouter.get('/getall', getAllReviews);
reviewsRouter.put('/update/:reviewId', userAuth,  updateReview);
reviewsRouter.delete('/delete/:reviewId',userAuth, deleteReview);
export default reviewsRouter;