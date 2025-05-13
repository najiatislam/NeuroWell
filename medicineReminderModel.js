import mongoose from "mongoose";

const medicineReminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  medicine: { type: String, required: true },
  dosage: { type: Number, required: true },
  time: { type: String, required: true }, // e.g., "23:56"
  frequency: { type: String, required: true }, // e.g., "night"
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  notes: { type: String }
});

export default mongoose.model("medicine_reminder", medicineReminderSchema);
