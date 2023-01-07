import { Router } from 'express';
import userRouter from './api/userRoutes.js';
import campaignRouter from './api/campaignRoutes.js';

const router = Router();

router.use('/api/users', userRouter);
router.use('/api/campaigns', campaignRouter);

export default router;
