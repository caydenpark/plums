// src/app/api/auth/signup/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { first_name, last_name, username, email, password } = await req.json();

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "User already exists with this email" },
      { status: 400 }
    );
  }

  const password_hash = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        first_name,
        last_name,
        username,
        email,
        password_hash,
      },
    });

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error creating user", error);
    return NextResponse.json(
      { error: "User creation failed" },
      { status: 400 }
    );
  }
}
