import prisma from "../../../../prisma/client";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  try {
    const topics = await prisma.topic.findMany();
    return NextResponse.json(topics);
  } catch (error) {
    console.error("Failed to fetch topics", error);
    return NextResponse.json(
      { message: "Failed to fetch topics" },
      { status: 500 }
    );
  }
}


