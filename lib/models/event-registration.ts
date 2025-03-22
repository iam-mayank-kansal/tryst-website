import mongoose from "mongoose";

const EventRegistrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  college: { type: String, required: true },
  rollNumber: { type: String, required: true },
  event: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  teamMembers: { type: String, required: true },
}, { timestamps: true });

// Check if the model already exists before defining it
const EventRegistration = mongoose.models.EventRegistration || mongoose.model("EventRegistration", EventRegistrationSchema);
export default EventRegistration;