import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params; // ✅ Теперь мы корректно ждём params!

  const existingItem = await prisma.stockItem.findUnique({
    where: { id },
  });

  if (!existingItem) {
    return NextResponse.json(
      { message: 'Материал уже удалён или не существует!' },
      { status: 404 }
    );
  }

  await prisma.stockItem.delete({
    where: { id },
  });

  return NextResponse.json({ message: 'Материал успешно удалён' });
}