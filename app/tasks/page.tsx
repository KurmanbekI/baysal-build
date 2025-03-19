'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Ошибка загрузки задач:', error));
  }, []);

  const filteredTasks = statusFilter
    ? tasks.filter((task) => task.status === statusFilter)
    : tasks;

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">📋 Список заданий</h1>

      {/* Фильтр по статусу */}
      <div className="mb-4 flex items-center space-x-4">
        <select
          className="border p-2 rounded-md shadow-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">🔎 Все статусы</option>
          <option value="new">🆕 Новые</option>
          <option value="in_progress">⚙ В процессе</option>
          <option value="completed">✅ Завершённые</option>
        </select>
      </div>

      {/* Таблица заданий */}
      <table className="w-full border-collapse rounded-md overflow-hidden shadow-lg">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Название</th>
            <th className="px-4 py-2 text-left">Описание</th>
            <th className="px-4 py-2 text-left">Исполнитель</th>
            <th className="px-4 py-2 text-left">Приоритет</th>
            <th className="px-4 py-2 text-left">Статус</th>
            <th className="px-4 py-2">Действия</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">{task.title}</td>
              <td className="px-4 py-2">{task.description}</td>
              <td className="px-4 py-2">{task.assignee || "Не назначен"}</td>
              <td className="px-4 py-2">{task.priority}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-md text-white ${
                    task.status === 'new'
                      ? 'bg-blue-500'
                      : task.status === 'in_progress'
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                >
                  {task.status === 'new'
                    ? '🆕 Новое'
                    : task.status === 'in_progress'
                    ? '⚙ В процессе'
                    : '✅ Завершено'}
                </span>
              </td>
              <td className="px-4 py-2 flex space-x-2">
                <Link
                  href={`/tasks/${task.id}`}
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