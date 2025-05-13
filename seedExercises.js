import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Exercise from '../models/Exercise.js';
import connectDB from '../config/mongodb.js';

dotenv.config();
await connectDB();

await Exercise.deleteMany();

await Exercise.insertMany([
  {
    name: 'Cardio Workout',
    goalType: 'weight_loss',
    description: 'A great way to burn calories and improve cardiovascular health.',
    steps: ['Warm-up', 'Jog for 20 minutes', 'Cool down'],
  },
  {
    name: 'Yoga for Stress Relief',
    goalType: 'stress',
    description: 'Yoga practices to help calm the mind and reduce stress.',
    steps: ['Mountain pose', 'Downward dog', 'Child’s pose'],
  },
  {
    name: 'Breathing Exercises for Calm',
    goalType: 'stress',
    description: 'Deep breathing exercises to calm your nerves.',
    steps: ['Inhale for 4 seconds', 'Hold for 7 seconds', 'Exhale for 8 seconds'],
  },
]);

console.log('✅ Exercises seeded');
process.exit();
