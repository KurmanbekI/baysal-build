import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { name, role, experience } = await request.json();

  const employee = await prisma.employee.create({
    data: {
      name,
      role,
      experience,
    },
  });

  return NextResponse.json(employee);
}