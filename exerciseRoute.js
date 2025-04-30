import express from 'express';
import Exercise from '../models/Exercise.js';

const router = express.Router();

// Get exercises by goalType
router.get('/:goalType', async (req, res) => {
  try {
    const exercises = await Exercise.find({ goalType: req.params.goalType });
    res.json(exercises);
  } catch {
    res.status(500).json({ error: 'Failed to fetch exercises' });
  }
});

export default router;
