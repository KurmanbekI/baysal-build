import EmployeeList from "@/components/EmployeeList";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getEmployees() {
  const employees = await prisma.employee.findMany();
  return employees;
}

export default async function EmployeesPage() {
  const employees = await prisma.employee.findMany();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Список сотрудников</h1>
      <EmployeeList employees={employees} />
    </div>
  );
}