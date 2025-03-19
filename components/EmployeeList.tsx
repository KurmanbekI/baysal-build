import Link from 'next/link';

export default function EmployeeList({ employees }) {
  return (
    <div>
      <h2 className="text-xl font-bold">Список сотрудников</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            <Link href={`/employees/${employee.id}`}>
              {employee.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}