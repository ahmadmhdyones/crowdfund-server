import { Router } from 'express';
import userRouter from './api/userRoutes.js';

const router = Router();

router.use('/api/v1/users', userRouter);

export default router;
