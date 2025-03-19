import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Редактирование материала
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { name, category, quantity, unit, description } = await request.json();

  const updatedItem = await prisma.stockItem.update({
    where: { id: params.id },
    data: {
      name,
      category,
      quantity: parseInt(quantity),
      unit,
      description,
    },
  });

  return NextResponse.json(updatedItem);
}

// Удаление материала
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.stockItem.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: 'Материал удалён успешно' });
}