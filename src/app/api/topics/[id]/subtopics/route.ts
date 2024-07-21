import prisma from "../../../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";

//POST
// Function incharge of creating a new subtopic based on the id

export async function POST(request: NextRequest) {
  try {
    // Extract topicId from URL parameters
    const id = request.nextUrl.searchParams.get("id");

    // Parse request body
    const { name } = await request.json();

    // Validate and sanitize inputs
    if (!name || !id) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Create new subtopic
    const newSubtopic = await prisma.topic.create({
      data: {
        name,
        parent_id: parseInt(id, 10),
        user_id: 0, // Replace 0 with the actual user ID
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
