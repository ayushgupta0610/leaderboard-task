import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

interface Props {
  params: { id: string };
}

export async function GET(request: NextRequest, params: Props) {
  console.log("params under users: ", params);
  const users = await prisma.user.findMany();
  if (!users)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json(users, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // Check if the email already exists
  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  // If it does, return an error
  if (user)
    return NextResponse.json({ error: "User already exists" }, { status: 400 });

  // Create a new user in the database
  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}
