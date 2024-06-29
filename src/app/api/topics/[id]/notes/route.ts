import { NextResponse } from "next/server";
import prisma from "../../../../../../prisma/client";

// GET /api/topics/[id]/notes
//function to fetch all notes for a topic from the database and return them
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const notes = await prisma.note.findMany({
      where: { topic_id: parseInt(id, 10) },
      orderBy: { date_added: "asc" },
    });

    if (!notes.length) {
      return NextResponse.json(
        { error: "No notes found for this topic" },
        { status: 404 }
      );
    }

    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}