import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  console.log("middleware");
}
