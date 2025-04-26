import express from 'express';
import { registerUser, loginUser, getUser } from '../controllers/UserController.js';
const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/get/:userId', getUser);
export default userRouter;