import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

interface Props {
  params: { id: string };
}

export async function GET(request: NextRequest, params: Props) {
  const user = await prisma.user.findUnique({
    where: { id: params.params.id },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json(user, { status: 200 });
}

export async function PUT(request: NextRequest, params: Props) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // Check if the user exists
  const user = await prisma.user.findUnique({
    where: { id: params.params.id },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Make the required update in the DB and return
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { name: body.name, email: body.email },
  });

  return NextResponse.json(updatedUser);
}

export async function DELETE(request: NextRequest, params: Props) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // Check if the user exists
  const user = await prisma.user.findUnique({
    where: { id: params.params.id },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  // delete user from the database
  await prisma.user.delete({ where: { id: user.id } });

  return NextResponse.json({ message: "User deleted" });
}
