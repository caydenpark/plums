import prisma from "../../../../prisma/client";
import { NextResponse, NextRequest } from "next/server";

//GET api/topics
//function to fetch all topics from the database and return them
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

//POST /api/topics
//function to create new topics in the database and return the created topic
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, userId } = body;

    if (!name || !userId) {
      return NextResponse.json(
        { message: "Name and userId are required" },
        { status: 400 }
      );
    }

    // Validate userId is a number if that's the expected type
    if (typeof userId !== "number") {
      return NextResponse.json(
        { message: "Invalid userId format" },
        { status: 400 }
      );
    }

    const topic = await prisma.topic.create({
      data: {
        name,
        user: { connect: { id: userId } },
      },
    });

    return NextResponse.json(topic, { status: 201 });
  } catch (error) {
    console.error("Failed to create topic", error);
    return NextResponse.json(
      { message: "Failed to create topic" },
      { status: 500 }
    );
  }
}
