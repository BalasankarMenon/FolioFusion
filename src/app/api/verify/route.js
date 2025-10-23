import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { token } = await req.json();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.json({ valid: true, decoded });
  } catch (err) {
    return NextResponse.json({ valid: false });
  }
}