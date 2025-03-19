import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { title, description, priority, deadline, status } = await request.json();

  const project = await prisma.project.update({
    where: { id: params.id },
    data: {
      title,
      description,
      priority,
      deadline: new Date(deadline),
      status,
    },
  });

  return NextResponse.json(project);
}