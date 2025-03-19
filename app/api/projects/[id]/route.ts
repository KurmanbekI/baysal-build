import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// 📌 Получение проекта по ID (Исправлено!)
export async function GET(request: NextRequest, context: { params }: { params: { id: string } }) {
  try {
    if (!context.params || !context.params.id) {
      return NextResponse.json({ error: 'Некорректный ID проекта' }, { status: 400 });
    }

    const projectId = decodeURIComponent(context.params.id); // ✅ Теперь ID корректно обрабатывается

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json({ error: 'Проект не найден' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Ошибка загрузки проекта:', error);
    return NextResponse.json({ error: 'Ошибка загрузки проекта' }, { status: 500 });
  }
}

// 📌 Редактирование проекта (PUT)
export async function PUT(request: NextRequest, context: { params }: { params: { id: string } }) {
  try {
    if (!context.params || !context.params.id) {
      return NextResponse.json({ error: 'Некорректный ID проекта' }, { status: 400 });
    }

    const projectId = decodeURIComponent(context.params.id);
    const { title, description, startDate, endDate, status } = await request.json();

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        status,
      },
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('Ошибка обновления проекта:', error);
    return NextResponse.json({ error: 'Ошибка обновления проекта' }, { status: 500 });
  }
}

// 📌 Удаление проекта (DELETE)
export async function DELETE(request: NextRequest, context: { params }: { params: { id: string } }) {
  try {
    if (!context.params || !context.params.id) {
      return NextResponse.json({ error: 'Некорректный ID проекта' }, { status: 400 });
    }

    const projectId = decodeURIComponent(context.params.id);

    await prisma.project.delete({
      where: { id: projectId },
    });

    return NextResponse.json({ message: 'Проект удалён' }, { status: 200 });
  } catch (error) {
    console.error('Ошибка удаления проекта:', error);
    return NextResponse.json({ error: 'Ошибка удаления проекта' }, { status: 500 });
  }
}