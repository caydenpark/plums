import prisma from "../../../../../../prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { ImgType } from "@prisma/client";

// GET /api/topics/:id/images
// Get all images for a specific topic
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const images = await prisma.image.findMany({
      where: { topic_id: parseInt(id, 10) },
    });
    if (!images) {
      return NextResponse.json(
        { message: "Images not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch images", error);
    return NextResponse.json(
      { message: "Failed to fetch images" },
      { status: 500 }
    );
  }
}

// POST /api/topics/:id/images
// Add a new image to a specific topic
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { name, type, url } = await req.json();

  try {
    const newImage = await prisma.image.create({
      data: {
        name,
        type: type as ImgType,
        url,
        topic_id: parseInt(id, 10),
      },
    });
    return NextResponse.json(newImage, { status: 201 });
  } catch (error) {
    console.error("Failed to add image", error);
    return NextResponse.json(
      { message: "Failed to add image" },
      { status: 500 }
    );
  }
}
