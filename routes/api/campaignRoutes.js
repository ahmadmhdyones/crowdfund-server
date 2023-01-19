import { Router } from 'express';
import {
  addCampaign,
  getDeployedCampaigns,
  getDeployedCampaignById,
  getCampaigns,
  getCampaignById,
  getConsultationCampains,
  getConsultationCampainById,
  updateCampaignApproval,
  getMyCampaigns
} from '../../controllers/campaignController.js';
import { protect, admin, consultant } from '../../middleware/authMiddleware.js';

const router = Router();

router.get('/deployed', getDeployedCampaigns);
router.get('/deployed/:id', getDeployedCampaignById);

router.get('/consultation', protect, consultant, getConsultationCampains);
router
  .route('/consultation/:id')
  .get(protect, consultant, getConsultationCampainById)
  .patch(protect, consultant, updateCampaignApproval);

router.get('/mine', protect, getMyCampaigns);

router.route('/').post(protect, addCampaign).get(getCampaigns);
router.route('/:id').get(getCampaignById);

export default router;
