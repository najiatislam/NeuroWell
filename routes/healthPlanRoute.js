import express from 'express';
import { healthPlans } from '../data/healthPlans.js';

const router = express.Router();

// GET /api/health-plans — return all predefined plans
router.get('/', (req, res) => {
  res.json(healthPlans);
});

export default router;