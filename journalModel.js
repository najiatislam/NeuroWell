import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['journal', 'article', 'study'],
    required: true
  },
  journal: String,
  authors: [String],
  publishDate: String,
  impact: String,
  keywords: [String],
  abstract: String,
  institution: String,
  status: String,
  phase: String,
  participants: Number,
  leadResearcher: String,
  startDate: String,
  endDate: String,
  category: String,
  description: String,
  objectives: [String],
  preview: String,
  readTime: String,
  author: String,
  date: String,
  image: String
}, { timestamps: true });

const Journal = mongoose.model('Journal', journalSchema);

export default Journal;