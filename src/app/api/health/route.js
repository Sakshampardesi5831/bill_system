import { NextResponse } from "next/server";
export async function GET() {
    try {
        return NextResponse.json({ message: "API is working" });
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}