import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Получить все материалы склада
export async function GET() {
  const items = await prisma.stockItem.findMany();
  return NextResponse.json(items);
}

// Добавить новый материал
export async function POST(request: NextRequest) {
  const { name, category, quantity, unit, description } = await request.json();

  const item = await prisma.stockItem.create({
    data: {
      name,
      category,
      quantity: parseInt(quantity),
      unit,
      description,
    },
  });

  return NextResponse.json(item);
}