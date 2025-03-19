'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddTaskForm({ employeeId, projectId }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    dueDate: '',
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
        title: formData.title,
        startDate: formData.startDate,
        dueDate: formData.dueDate,
        employeeId,
        projectId,
      }),
    });

    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        placeholder="Название задачи"
        onChange={handleChange}
        required
      />
      <input
        name="startDate"
        type="date"
        onChange={handleChange}
        required
      />
      <input
        name="dueDate"
        type="date"
        onChange={handleChange}
        required
      />
      <button type="submit">Создать задачу</button>
    </form>
  );
}