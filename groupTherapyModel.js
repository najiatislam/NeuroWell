import mongoose from "mongoose";

const groupTherapySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  participants: {
    type: String,
    required: true
  },
  therapist: {
    type: String,
    required: true
  },
  maxParticipants: {
    type: Number,
    required: true
  },
  currentParticipants: {
    type: Number,
    default: 0
  },
  participantIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'users',
    default: []
  },
  meetingLink: {
    type: String,
    default: ""
  }
}, { timestamps: true });

const GroupTherapy = mongoose.model("group_therapy", groupTherapySchema);

export default GroupTherapy;