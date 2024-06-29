import { NextRequest, NextResponse } from "next/server"; // Work Better than NextApiRequest and NextApiResponse
import prisma from "../../../../prisma/client";

// GET /api/notes
//function to create new notes in the database and return the created note
export async function POST(req: Request) {
  const { title, content, topic_id } = await req.json();

  try {
    const newNote = await prisma.note.create({
      data: {
        title,
        content,
        topic_id,
      },
    });

    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    console.error("Error creating note:", error);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
}
