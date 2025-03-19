import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// 📌 GET: Получение списка сотрудников
export async function GET() {
  try {
    const employees = await prisma.employee.findMany();
    return NextResponse.json(employees);
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка загрузки сотрудников' }, { status: 500 });
  }
}