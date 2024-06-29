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
  const body = await req.json();
  const { name } = body;

  if (!name) {
    return NextResponse.json({ message: "Name is required" }, { status: 400 });
  }

  try {
    const topic = await prisma.topic.create({
      data: {
        name,
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
