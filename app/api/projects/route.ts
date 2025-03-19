import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const projects = await prisma.project.findMany();
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const { title, description, priority, deadline } = await request.json();

  const project = await prisma.project.create({
    data: { title, description, priority, deadline: new Date(deadline), status: "new" },
  });

  return NextResponse.json(project);
}