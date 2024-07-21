import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

//POST
// Function incharge of creating a new subtopic based on the topicId

// export async function POST(request: NextRequest) {
//   const { topicId } = request.params;
//   const { name } = await request.body.json();

//   const data: Prisma.SubtopicCreateInput = {
//     name,
//     Topic: {
//       connect: {
//         id: parseInt(topicId),
//       },
//     },
//   };

//   const newSubtopic = await request.prisma.subtopic.create({
//     data,
//   });

//   return NextResponse.json(newSubtopic);
// }
