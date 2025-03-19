import { PrismaClient } from '@prisma/client';
import EditEmployeeForm from '@/components/EditEmployeeForm';
import AddTaskForm from '@/components/AddTaskForm';

const prisma = new PrismaClient();

export default async function EmployeePage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  // Явно ожидаем параметры, если они являются Promise
  const { id } = await params;

  const employee = await prisma.employee.findUnique({
    where: { id },
    include: { tasks: true },
  });

  if (!employee) return <div>Сотрудник не найден</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{employee.name}</h1>
      <p>
        <strong>Должность:</strong> {employee.role}
      </p>
      <p>
        <strong>Стаж работы:</strong> {employee.experience} лет
      </p>
      <p>
        Последняя проверка ТБ:{' '}
        {employee.lastSafetyCheck
          ? new Date(employee.lastSafetyCheck).toLocaleDateString()
          : 'Не указано'}
      </p>

      <h2 className="mt-6 text-xl font-semibold">Задачи сотрудника:</h2>
      <ul className="list-disc pl-4">
        {employee.tasks.map((task) => (
          <li key={task.id}>
            {task.title} — Статус: {task.status}
          </li>
        ))}
      </ul>

      <h2 className="mt-6 text-xl font-semibold">Редактировать сотрудника:</h2>
      <EditEmployeeForm employee={employee} />

      <h2 className="mt-6 text-xl font-semibold">
        Добавить новую задачу сотруднику:
      </h2>
      {/* Замените "REPLACE_WITH_VALID_PROJECT_ID" на реальный ID существующего проекта */}
      <AddTaskForm employeeId={employee.id} projectId="REPLACE_WITH_VALID_PROJECT_ID" />
    </div>
  );
}

export async function generateStaticParams() {
  const prisma = new PrismaClient();
  const employees = await prisma.employee.findMany();
  return employees.map((employee) => ({ id: employee.id }));
}