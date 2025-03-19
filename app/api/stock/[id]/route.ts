import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } | Promise<{ id: string }> }
) {
  const { id } = await params; // ✅ исправляем params ошибку

  const existingItem = await prisma.stockItem.findUnique({ where: { id } });

  if (!existingItem) {
    return NextResponse.json({ message: 'Материал уже удалён!' }, { status: 404 });
  }

  await prisma.stockItem.delete({
    where: { id },
  });

  return NextResponse.json({ message: 'Материал удалён успешно' });
}