import express from 'express';
import ProfileController from '../controllers/profileController';
import isAuthenticated from '../middleware/authMiddleware';

const router = express.Router();

// /api/profile
router.get('/', isAuthenticated, ProfileController.getProfile);
router.post('/', isAuthenticated, ProfileController.createOrUpdate);

router.get('/verify-username/:username', isAuthenticated, ProfileController.verifyUsername);
router.get('/search/:username', isAuthenticated, ProfileController.searchUsers);

export default router;
