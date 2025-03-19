'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Ошибка загрузки проектов:', error));
  }, []);

  const filteredProjects = statusFilter
    ? projects.filter((proj) => proj.status === statusFilter)
    : projects;

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">🏗 Проекты</h1>

      {/* Фильтр по статусу */}
      <div className="mb-4 flex items-center space-x-4">
        <select
          className="border p-2 rounded-md shadow-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">🔎 Все проекты</option>
          <option value="pending">⏳ Ожидает начала</option>
          <option value="in_progress">⚙ В работе</option>
          <option value="completed">✅ Завершён</option>
        </select>
        <Link
          href="/projects/create"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          ➕ Создать проект
        </Link>
      </div>

      {/* Таблица проектов */}
      <table className="w-full border-collapse rounded-md overflow-hidden shadow-lg">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Название</th>
            <th className="px-4 py-2 text-left">Описание</th>
            <th className="px-4 py-2 text-left">Дата начала</th>
            <th className="px-4 py-2 text-left">Дата завершения</th>
            <th className="px-4 py-2 text-left">Статус</th>
            <th className="px-4 py-2">Действия</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((proj) => (
            <tr key={proj.id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">{proj.title}</td>
              <td className="px-4 py-2">{proj.description}</td>
              <td className="px-4 py-2">{new Date(proj.startDate).toLocaleDateString()}</td>
              <td className="px-4 py-2">
                {proj.endDate ? new Date(proj.endDate).toLocaleDateString() : '—'}
              </td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-md text-white ${
                    proj.status === 'pending'
                      ? 'bg-yellow-500'
                      : proj.status === 'in_progress'
                      ? 'bg-blue-500'
                      : 'bg-green-500'
                  }`}
                >
                  {proj.status === 'pending'
                    ? '⏳ Ожидает'
                    : proj.status === 'in_progress'
                    ? '⚙ В работе'
                    : '✅ Завершён'}
                </span>
              </td>
              <td className="px-4 py-2 flex space-x-2">
                <Link
                  href={`/projects/${proj.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  ✏️ Редактировать
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}