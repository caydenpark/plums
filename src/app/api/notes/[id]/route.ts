import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

//DELETE /api/topics/[id]/notes/[id]
//function to delete a single note from the database based off its id
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.note.delete({
      where: { id: parseInt(id, 10) },
    });
    return NextResponse.json(
      { message: "Note deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting note:", error);
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 }
    );
  }
}

// PUT /api/topics/[id]/notes/[id]
// function to update a single note in the database based on its id
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { title, content, topic_id } = await req.json();

  try {
    const updatedNote = await prisma.note.update({
      where: { id: parseInt(id, 10) },
      data: {
        title,
        content,
        topic_id,
      },
    });
    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    console.error("Error updating note:", error);
    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 }
    );
  }
}