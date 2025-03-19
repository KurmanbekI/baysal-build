import { PrismaClient } from '@prisma/client';
import ProjectList from '@/components/ProjectList';

const prisma = new PrismaClient();

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Проекты компании</h1>
      <ProjectList projects={projects} />
    </div>
  );
}