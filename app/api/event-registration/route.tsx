import EventRegistration from "@/lib/models/event-registration";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import nodemailer from "nodemailer";
import { cookies } from "next/headers";

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Email template
const emailTemplate = (name: string, college: string, rollNumber: string, event: string, phone: string, email: string, teamMembers: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Event Registration Confirmation</title>
  <style>
    body, html { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; }
    .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); }
    .email-header { background-color: #1a73e8; color: #ffffff; text-align: center; padding: 20px; }
    .email-header h1 { margin: 0; font-size: 24px; font-weight: bold; }
    .email-body { padding: 20px; color: #333333; }
    .email-body h2 { font-size: 20px; margin-bottom: 10px; }
    .email-body p { font-size: 16px; line-height: 1.5; margin-bottom: 20px; }
    .email-body .details { background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
    .email-body .details p { margin: 5px 0; }
    .email-footer { text-align: center; padding: 20px; background-color: #f4f4f4; color: #666666; font-size: 14px; }
    .email-footer a { color: #1a73e8; text-decoration: none; }
    .btn { display: inline-block; padding: 10px 20px; background-color: #1a73e8; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px; margin-top: 20px; }
    .btn:hover { background-color: #1557b0; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>TRYST 2025 Event Registration Confirmation</h1>
    </div>
    <div class="email-body">
      <h2>Hello, ${name}!</h2>
      <p>Thank you for registering for ${event} at TRYST 2025. Below are your registration details:</p>
      <div class="details">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>College:</strong> ${college}</p>
        <p><strong>Roll Number:</strong> ${rollNumber}</p>
        <p><strong>Event:</strong> ${event}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Team Members:</strong> ${teamMembers}</p>
      </div>
      <p>If you have any questions, feel free to contact us at <a href="mailto:support@tryst2025.com">support@tryst2025.com</a>.</p>
      <a href="https://tryst2025.com" class="btn">Visit Our Website</a>
    </div>
    <div class="email-footer">
      <p>You are receiving this email because you registered for TRYST 2025.</p>
      <p><a href="https://tryst2025.com/unsubscribe">Unsubscribe</a> | <a href="https://tryst2025.com/privacy-policy">Privacy Policy</a></p>
    </div>
  </div>
</body>
</html>
`;

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // Save event registration data
    const newEventRegistration = new EventRegistration(body);
    await newEventRegistration.save();
3
    // Send Email
    const emailContent = emailTemplate(
      body.name,
      body.college,
      body.rollNumber,
      body.event,
      body.phone,
      body.email,
      body.teamMembers
    );

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: body.email,
      subject: `TRYST 2025 Event Registration Confirmation - ${body.event}`,
      html: emailContent,
    });

    return NextResponse.json({ message: "Event registration submitted successfully!" }, { status: 201 });
  } catch (error) {
    console.error("❌ Error processing request:", error);
    return NextResponse.json({ error: "Failed to save event registration data" }, { status: 500 });
  }
}

// Get all event registrations
export async function GET() {
    try {
        const cookieStore =await cookies();
        const session =  cookieStore.get("admin_session");

        if (session?.value !== "authenticated") {
            return NextResponse.json({ authenticated: false, message: "Not authenticated" });
        }
        await connectDB();

        const eventRegistrations = await EventRegistration.find();

        return NextResponse.json(eventRegistrations, { status: 200 });
    } catch (error) {
        console.error("❌ Error fetching event registrations:", error);
        return NextResponse.json({ error: "Failed to fetch event registration data" }, { status: 500 });
    }
}