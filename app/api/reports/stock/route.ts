import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const stockReport = await prisma.stockItem.groupBy({
    by: ['category'],
    _sum: {
      quantity: true,
    },
  });

  return NextResponse.json(stockReport);
}