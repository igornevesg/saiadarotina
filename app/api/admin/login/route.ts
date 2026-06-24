import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  if (body.password === process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}