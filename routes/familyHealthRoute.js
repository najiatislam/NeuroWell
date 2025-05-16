import express from 'express';
import FamilyHealthIssue from '../models/FamilyHealthIssue.js';

const router = express.Router();

// Get records for user
router.get('/:userId', async (req, res) => {
  try {
    const records = await FamilyHealthIssue.find({ userId: req.params.userId });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch family records' });
  }
});

// Add new record
router.post('/', async (req, res) => {
  try {
    const { userId, familyMember, healthIssues } = req.body;
    const newRecord = new FamilyHealthIssue({ userId, familyMember, healthIssues });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create record' });
  }
});

// Delete record
router.delete('/:id', async (req, res) => {
  try {
    await FamilyHealthIssue.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete record' });
  }
});

export default router;