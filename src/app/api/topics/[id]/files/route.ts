import prisma from "../../../../../../prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { FileType } from "@prisma/client";

//GET /api/topics/:id/files
//Get all files for a topic

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: "Topic ID is required" },
      { status: 400 }
    );
  }

  const files = await prisma.attachment.findMany({
    where: {
      topic_id: parseInt(id as string),
    },
  });

  return NextResponse.json(files);
}

//POST /api/topics/:id/files
//Upload a file to a topic
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: "Topic ID is required" },
      { status: 400 }
    );
  }

  const data = await req.formData();
  const file = data.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  const fileBuffer = await file.arrayBuffer();
  const fileBase64 = Buffer.from(fileBuffer);

  // Determine file type
  const fileExtension = file.name.split(".").pop()?.toUpperCase();
  let fileType: FileType | undefined;

  if (
    fileExtension &&
    Object.values(FileType).includes(fileExtension as FileType)
  ) {
    fileType = fileExtension as FileType;
  } else {
    return NextResponse.json(
      { error: "Unsupported file type" },
      { status: 400 }
    );
  }

  const newFile = await prisma.attachment.create({
    data: {
      topic_id: parseInt(id),
      name: file.name,
      type: fileType,
      content: fileBase64, // Make sure content is included in your Prisma schema
    },
  });

  return NextResponse.json(newFile);
}
