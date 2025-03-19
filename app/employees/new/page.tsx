'use client';

import AddEmployeeForm from '@/components/AddEmployeeForm';

export default function NewEmployeePage() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Добавление сотрудника</h1>
      <AddEmployeeForm />
    </div>
  );
}