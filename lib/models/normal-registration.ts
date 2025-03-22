import mongoose from "mongoose";

const NormalRegistrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  college: { type: String, required: true },
  rollNumber: { type: String, required: true },
  year: { type: String, required: true },
  course: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
}, { timestamps: true });

// Check if the model already exists before defining it
const NormalRegistration = mongoose.models.NormalRegistration || mongoose.model("NormalRegistration", NormalRegistrationSchema);
export default NormalRegistration;