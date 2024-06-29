import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

// GET /api/topics/[id]
//function to fetch a single topic from the database and return it
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const topic = await prisma.topic.findUnique({
      where: { id: parseInt(id, 10) },
      include: { notes: true },
    });

    if (!topic) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json(topic, { status: 200 });
  } catch (error) {
    console.error("Error fetching topic:", error);
    return NextResponse.json(
      { error: "Failed to fetch topic" },
      { status: 500 }
    );
  }
}
