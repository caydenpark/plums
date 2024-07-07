// src/app/api/topics/[id]/route.ts
import prisma from "../../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const topicId = Number(params.id);

  try {
    const topic = await prisma.topic.delete({
      where: {
        id: topicId,
      },
    });
    return NextResponse.json(topic, { status: 200 });
  } catch (error) {
    console.error("Failed to delete topic:", error);
    return NextResponse.json(
      { message: "Failed to delete topic" },
      { status: 500 }
    );
  }
}
