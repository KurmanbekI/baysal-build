'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddTaskForm({ employeeId }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'normal',
    status: 'new',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        assignee: employeeId, // ✅ Привязываем задачу к сотруднику
      }),
    });

    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-2">➕ Добавить задание</h2>

      <input
        name="title"
        placeholder="Название задания"
        className="border p-2 rounded-md w-full mb-2"
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Описание"
        className="border p-2 rounded-md w-full mb-2"
        onChange={handleChange}
        required
      />

      <select
        name="priority"
        className="border p-2 rounded-md w-full mb-2"
        onChange={handleChange}
        required
      >
        <option value="normal">⚪ Обычный</option>
        <option value="high">🔴 Высокий</option>
        <option value="urgent">🔥 Срочный</option>
      </select>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        ➕ Добавить
      </button>
    </form>
  );
}