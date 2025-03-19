import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function ProjectPage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  // Ожидаем параметры, если они являются Promise
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: { tasks: true, documents: true },
  });

  if (!project) return <div>Проект не найден</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{project.title}</h1>
      <p>{project.description}</p>
      <p>Приоритет: {project.priority}</p>
      <p>Дедлайн: {project.deadline.toLocaleDateString()}</p>

      <h2 className="mt-4 font-bold">Задачи проекта:</h2>
      <ul>
        {project.tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export async function generateStaticParams() {
  const prisma = new PrismaClient();
  const projects = await prisma.project.findMany();
  return projects.map((project) => ({ id: project.id }));
}