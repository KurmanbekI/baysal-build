'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddEmployeeForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    experience: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch('/api/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        role: formData.role,
        experience: parseInt(formData.experience),
      }),
    });

    router.push('/employees');
    router.refresh();
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Имя сотрудника"
        name="name"
        className="border px-2 py-1 w-full"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        placeholder="Должность"
        name="role"
        className="border px-2 py-1 w-full"
        value={formData.role}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        placeholder="Стаж работы (лет)"
        name="experience"
        className="border px-2 py-1 w-full"
        value={formData.experience}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Добавить сотрудника
      </button>
    </form>
  );
}