import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { title, description, status, startDate, dueDate } = await request.json();

  const task = await prisma.task.update({
    where: { id: params.id },
    data: {
      title,
      description,
      status,
      startDate: new Date(startDate),
      dueDate: new Date(dueDate),
    },
  });

  return Response.json(task);
}