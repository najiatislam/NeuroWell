import HealthPlan from '../models/healthPlanModel.js';

// Helper: Generate personalized mental wellness plan
const generatePlan = (medicalHistory, goals) => {
  let plan = '🧠 Your Personalized Mental Wellness Plan:\n\n';

  if (medicalHistory.includes('anxiety')) {
    plan += '- Practice daily mindfulness meditation (10 mins)\n';
    plan += '- Avoid caffeine and maintain regular sleep\n';
  }

  if (medicalHistory.includes('depression')) {
    plan += '- Engage in small daily tasks or goals\n';
    plan += '- Spend time outdoors in natural light\n';
  }

  if (medicalHistory.includes('insomnia')) {
    plan += '- Create a consistent bedtime routine\n';
    plan += '- Avoid screens at least 1 hour before bed\n';
  }

  if (medicalHistory.includes('burnout')) {
    plan += '- Take 5-minute breaks every hour\n';
    plan += '- Define boundaries between work and rest\n';
  }

  if (medicalHistory.includes('OCD')) {
    plan += '- Try exposure-response therapy\n';
    plan += '- Avoid compulsive reassurance-seeking\n';
  }

  if (goals.includes('emotional balance')) {
    plan += '- Keep a daily emotion journal\n';
    plan += '- Practice gratitude (write 3 things nightly)\n';
  }

  if (goals.includes('stress relief')) {
    plan += '- Use 4-6 breathing techniques\n';
    plan += '- Listen to calming music or nature sounds\n';
  }

  if (goals.includes('better focus')) {
    plan += '- Use the Pomodoro technique (25/5 rule)\n';
    plan += '- Minimize multitasking, focus one task at a time\n';
  }



  return plan;
};

// Controller: Create or update the plan
export const createOrUpdateHealthPlan = async (req, res) => {
  try {
    const { userId, goals, medicalHistory } = req.body;

    console.log('📩 Incoming plan request:', req.body);

    if (!userId || !Array.isArray(goals) || !Array.isArray(medicalHistory)) {
      return res.status(400).json({ success: false, message: 'Missing or invalid fields' });
    }

    const cleanedGoals = goals.map(g => g.trim()).filter(Boolean);
    const cleanedHistory = medicalHistory.map(h => h.trim()).filter(Boolean);

    const recommendedPlan = generatePlan(cleanedHistory, cleanedGoals);

    const plan = await HealthPlan.findOneAndUpdate(
      { userId },
      { goals: cleanedGoals, medicalHistory: cleanedHistory, recommendedPlan },
      { new: true, upsert: true }
    );

    res.json({ success: true, plan });
  } catch (error) {
    console.error('❌ Plan generation error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller: Get a user's plan
export const getHealthPlan = async (req, res) => {
  try {
    const plan = await HealthPlan.findOne({ userId: req.params.userId });

    if (!plan) {
      return res.status(404).json({ success: false, message: 'No health plan found' });
    }

    res.json({ success: true, plan });
  } catch (error) {
    console.error('❌ Error fetching health plan:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
