import mongoose from 'mongoose';

const familyHealthIssueSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  familyMember: {
    type: String,
    required: true,
  },
  healthIssues: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('FamilyHealthIssue', familyHealthIssueSchema);
