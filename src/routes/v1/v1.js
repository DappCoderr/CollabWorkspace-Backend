import express from 'express';
import userRoutes from './userRoutes.js';
import workspaceRoutes from './workspaceRoutes.js';

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API v1 is healthy',
  });
});

router.use('/users', userRoutes);
router.use('/workspaces', workspaceRoutes);

export default router;
