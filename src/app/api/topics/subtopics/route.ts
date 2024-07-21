import prisma from "../../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authConfig } from "../../../lib/auth";

// POST endpoint to create a new subtopic
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, topicId } = await request.json();

    // Validate and sanitize inputs
    if (!name || !topicId) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Create a new subtopic
    const newSubtopic = await prisma.topic.create({
      data: {
        name,
        parent_id: topicId, // Use topicId directly
        user_id: session.user.id, // Use session.user.id directly
      },
    });

    // Return the newly created subtopic
    return NextResponse.json(newSubtopic);
  } catch (error) {
    console.error("Failed to create subtopic:", error);
    return NextResponse.json(
      { error: "Failed to create subtopic" },
      { status: 500 }
    );
  }
}
