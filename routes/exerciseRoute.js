import express from 'express';
import Exercise from '../models/Exercise.js';

const router = express.Router();

// GET /api/exercises/ — return all exercises
router.get('/', async (req, res) => {
  try {
    const allExercises = await Exercise.find({});
    res.json(allExercises);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch all exercises' });
  }
});

// GET /api/exercises/:goalType — return exercises based on goal
router.get('/:goalType', async (req, res) => {
  try {
    const exercises = await Exercise.find({ goalType: req.params.goalType });
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch exercises' });
  }
});

export default router;