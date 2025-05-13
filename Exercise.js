import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  goalType: { type: String, required: true },  // 'weight_loss', 'stress', etc.
  description: String,
  steps: [String],
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
export default Exercise;
