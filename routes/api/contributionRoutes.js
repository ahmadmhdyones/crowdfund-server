import { Router } from 'express';
import {
  getMyContributions,
  fundCampaign
} from '../../controllers/contributionController.js';
import { protect, admin } from '../../middleware/authMiddleware.js';

const router = Router();

router.get('/mine', protect, getMyContributions);
router.post('/fund', protect, fundCampaign);

export default router;
