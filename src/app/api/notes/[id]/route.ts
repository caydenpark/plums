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
