import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// 📌 Получение всех проектов
export async function GET() {
  try {
    const projects = await prisma.project.findMany();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка загрузки проектов' }, { status: 500 });
  }
}

// 📌 Создание нового проекта
export async function POST(request: NextRequest) {
  try {
    const { title, description, startDate, endDate, status } = await request.json();

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        status,
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка при создании проекта' }, { status: 500 });
  }
}