import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json(
    { status: "ok", service: "gili-hub" },
    { headers: { "Cache-Control": "no-store" } },
  );
}
