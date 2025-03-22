import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/lib/models/contact"; 
import { cookies } from "next/headers";

// Save contact form data
export async function POST(req: Request) {
    try {
        await connectDB(); 
        const body = await req.json();

        const newContact = new Contact(body);
        await newContact.save();

        return NextResponse.json({ message: "Form submitted successfully!" }, { status: 201 });
    } catch (error) {
        console.error("❌ Error processing request:", error);
        return NextResponse.json({ error: "Failed to save contact data" }, { status: 500 });
    }
}

// get all contact details 
export async function GET() {
    try {
        const cookieStore = await cookies()
        const session = cookieStore.get("admin_session")

        if (session?.value !== "authenticated") {
            return NextResponse.json({ authenticated: false, message : "Not authenticated" })
        }
        await connectDB(); 

        const contacts = await Contact.find(); 

        return NextResponse.json(contacts, { status: 200 });
    } catch (error) {
        console.error("❌ Error fetching contacts:", error);
        return NextResponse.json({ error: "Failed to fetch contact data" }, { status: 500 });
    }
}
