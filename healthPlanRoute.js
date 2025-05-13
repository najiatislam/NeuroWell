// routes/healthPlanRoute.js
import express from 'express';
import { createOrUpdateHealthPlan, getHealthPlan } from '../controllers/healthPlanController.js';

const router = express.Router();

// POST request to create or update a health plan
router.post('/create', createOrUpdateHealthPlan);
// GET request to fetch a health plan by user ID
router.get('/:userId', getHealthPlan);

export default router;
