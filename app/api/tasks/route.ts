import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// 📌 Получение всех задач
export async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка загрузки задач' }, { status: 500 });
  }
}

// 📌 Создание новой задачи
export async function POST(request: NextRequest) {
  try {
    const { title, description, priority, status, assignee } = await request.json();

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        status,
        assignee, // ✅ Теперь задача привязывается к сотруднику
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка при создании задачи' }, { status: 500 });
  }
}