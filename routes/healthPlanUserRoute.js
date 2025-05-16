import express from 'express';
import User from '../models/userModel.js'; // adjust if user model path is different

const router = express.Router();

// Save selected plan
router.post('/select', async (req, res) => {
  const { userId, planId } = req.body;
  if (!userId || !planId) {
    return res.status(400).json({ success: false, message: 'User ID and Plan ID are required' });
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { selectedHealthPlanId: planId },
      { new: true }
    );
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({ success: true, message: 'Health plan selected successfully', planId });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// Get selected plan
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({ success: true, planId: user.selectedHealthPlanId });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

export default router;
