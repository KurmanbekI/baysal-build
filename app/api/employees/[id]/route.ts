import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } | Promise<{ id: string }> }
) {
  const awaitedParams = await params; // исправлено ✅
  const { id } = awaitedParams;

  const { name, role, experience } = await request.json();

  const updatedEmployee = await prisma.employee.update({
    where: { id },
    data: {
      name,
      role,
      experience: parseInt(experience),
    },
  });

  return NextResponse.json(updatedEmployee);
}