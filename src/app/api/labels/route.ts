import prisma from "../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";

//POST api/labels
// Create a new label for a topic
export async function POST(req: NextRequest) {
  const { name, topicId } = await req.json();

  try {
    // Create the label
    const label = await prisma.label.upsert({
      where: { name },
      update: {},
      create: { name },
    });

    // Associate the label with the topic
    await prisma.topicLabels.create({
      data: {
        topic_id: topicId,
        label_id: label.id,
      },
    });

    return NextResponse.json({
      message: "Label created and associated with topic",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create label" },
      { status: 500 }
    );
  }
}

//GET api/labels
// Get all labels
export async function GET() {
  try {
    const labels = await prisma.label.findMany();
    return NextResponse.json(labels);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch labels" },
      { status: 500 }
    );
  }
}
