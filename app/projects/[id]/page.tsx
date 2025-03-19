'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ProjectPage() {
  const router = useRouter();
  const params = useParams(); // ✅ Теперь params правильно обрабатывается
  const { id } = params; // ✅ Теперь можно получить `id`

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/projects/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Ошибка загрузки проекта');
        return res.json();
      })
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center">⏳ Загрузка проекта...</p>;
  if (error) return <p className="text-red-600 text-center">❌ Ошибка: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h1>
      <p className="text-gray-700 mb-4">{project.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-gray-600">📅 Дата начала:</p>
          <p className="font-semibold">{new Date(project.startDate).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-gray-600">📅 Дата завершения:</p>
          <p className="font-semibold">
            {project.endDate ? new Date(project.endDate).toLocaleDateString() : '—'}
          </p>
        </div>
        <div>
          <p className="text-gray-600">📌 Статус:</p>
          <span
            className={`px-3 py-1 rounded-md text-white ${
              project.status === 'pending'
                ? 'bg-yellow-500'
                : project.status === 'in_progress'
                ? 'bg-blue-500'
                : 'bg-green-500'
            }`}
          >
            {project.status === 'pending'
              ? '⏳ Ожидает'
              : project.status === 'in_progress'
              ? '⚙ В работе'
              : '✅ Завершён'}
          </span>
        </div>
      </div>

      <div className="flex space-x-4">
        <Link
          href={`/projects/${id}/edit`}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          ✏️ Редактировать
        </Link>

        <button
          onClick={() => router.back()}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
        >
          ⬅️ Назад
        </button>
      </div>
    </div>
  );
}