import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { title, description, employeeId, projectId, startDate, dueDate } = await request.json();

  const task = await prisma.task.create({
    data: {
      title,
      description: "",
      employeeId,
      projectId,
      startDate: new Date(startDate),
      dueDate: new Date(dueDate),
    },
  });

  return Response.json(task);
}