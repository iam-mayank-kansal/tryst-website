import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(request: Request) {
  const { email, password } = await request.json()

  // Validate credentials
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // Set a secure HTTP-only cookie for authentication
    const cookieStore = await cookies()
    cookieStore.set({
      name: "admin_session",
      value: "authenticated",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })

    return NextResponse.json({ success: true })
  }

  // Return error for invalid credentials
  return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
}

