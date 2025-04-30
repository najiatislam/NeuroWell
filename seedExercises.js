import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Exercise from '../models/Exercise.js';
import connectDB from '../config/mongodb.js';

dotenv.config();
await connectDB();

await Exercise.deleteMany();

await Exercise.insertMany([
  {
    name: 'Yoga',
    goalType: 'weight_loss',
    description: 'Improves posture and burns calories.',
    steps: ['Mountain pose', 'Downward dog', 'Child’s pose'],
  },
  {
    name: 'Cardio',
    goalType: 'weight_loss',
    description: 'Heart-pumping exercise for weight loss.',
    steps: ['Jogging', 'Jumping jacks', 'Cycling'],
  },
  {
    name: 'Meditation',
    goalType: 'stress',
    description: 'Calms your mind and body.',
    steps: ['Sit quietly', 'Focus on breath'],
  },
  {
    name: 'Breathing Exercises',
    goalType: 'stress',
    description: 'Helps relieve tension.',
    steps: ['4-7-8 breathing', 'Box breathing'],
  },
  {
    name: 'Pilates',
    goalType: 'increased_flexibility',
    description: 'Core strengthening and flexibility.',
    steps: ['Hundred', 'Leg circles', 'Spine stretch'],
  },
]);

console.log('✅ Exercise data seeded');
process.exit();
