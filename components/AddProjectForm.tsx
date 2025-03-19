'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProjectForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '',
    deadline: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        deadline: formData.deadline,
      }),
    });

    router.push('/projects');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        placeholder="Название проекта"
        onChange={(e) => handleChange(e)}
        required
      />
      <textarea
        name="description"
        placeholder="Описание проекта"
        onChange={handleChange}
      />
      <input
        name="priority"
        placeholder="Приоритет (low, medium, high)"
        onChange={handleChange}
        required
      />
      <input
        name="deadline"
        type="date"
        onChange={handleChange}
        required
      />
      <button type="submit">Добавить проект</button>
    </form>
  );
}