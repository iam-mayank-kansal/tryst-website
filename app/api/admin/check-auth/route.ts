import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")

  if (session?.value === "authenticated") {
    return NextResponse.json({ authenticated: true })
  }

  return NextResponse.json({ authenticated: false, message: "Not authenticated" }, { status: 401 })
}

