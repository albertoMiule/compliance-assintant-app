import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text } = await req.json();

  const result = `✅ Summary: ${text.slice(0, 50)}...`; // Simulated result
  return NextResponse.json({ result });
}