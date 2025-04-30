import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  goalType: { type: String, required: true }, // e.g., 'weight_loss'
  description: String,
  steps: [String],
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
export default Exercise;
