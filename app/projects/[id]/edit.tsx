'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id; // ✅ Теперь params.id корректно обрабатывается

  const [project, setProject] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'pending',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/projects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProject({
          title: data.title,
          description: data.description,
          startDate: data.startDate.split('T')[0], // Убираем время
          endDate: data.endDate ? data.endDate.split('T')[0] : '',
          status: data.status,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Ошибка загрузки проекта:', err);
        setError('Ошибка загрузки проекта');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });

    if (response.ok) {
      router.push(`/projects/${id}`);
    } else {
      alert('Ошибка при обновлении проекта');
    }
  };

  if (loading) return <p className="text-center">⏳ Загрузка...</p>;
  if (error) return <p className="text-red-600 text-center">❌ {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">✏️ Редактировать проект</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Название проекта"
          value={project.title}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
          required
        />

        <textarea
          name="description"
          placeholder="Описание"
          value={project.description}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
          required
        />

        <input
          type="date"
          name="startDate"
          value={project.startDate}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
          required
        />

        <input
          type="date"
          name="endDate"
          value={project.endDate}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        />

        <select
          name="status"
          value={project.status}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
          required
        >
          <option value="pending">⏳ Ожидает</option>
          <option value="in_progress">⚙ В работе</option>
          <option value="completed">✅ Завершён</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          💾 Сохранить
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition ml-4"
        >
          ⬅️ Отмена
        </button>
      </form>
    </div>
  );
}