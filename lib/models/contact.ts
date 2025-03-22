import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  college: { type: String, required: true },
  course: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true });

// Check if the model already exists before defining it
const Contact = mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
export default Contact;