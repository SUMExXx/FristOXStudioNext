import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Params) {
  return NextResponse.json({ message: `User ID: ${params.id}` });
}
