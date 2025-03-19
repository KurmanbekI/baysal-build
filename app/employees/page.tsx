'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('/api/employees')
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);

  const filteredEmployees = filter
    ? employees.filter((emp) => emp.role === filter)
    : employees;

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">👨‍💼 Сотрудники компании</h1>

      {/* Фильтр по должностям */}
      <div className="mb-4 flex items-center space-x-4">
        <select
          className="border p-2 rounded-md shadow-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">🔎 Все должности</option>
          <option value="Лазерщик">🔦 Лазерщик</option>
          <option value="Сварщик">🔥 Сварщик</option>
          <option value="Инженер">🛠 Инженер</option>
          <option value="Проектировщик">📐 Проектировщик</option>
        </select>
      </div>

      {/* Таблица сотрудников */}
      <table className="w-full border-collapse rounded-md overflow-hidden shadow-lg">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Фото</th>
            <th className="px-4 py-2 text-left">ФИО</th>
            <th className="px-4 py-2 text-left">Должность</th>
            <th className="px-4 py-2 text-left">Стаж (лет)</th>
            <th className="px-4 py-2 text-left">ТБ</th>
            <th className="px-4 py-2">Действия</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((emp) => (
            <tr key={emp.id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">
                {emp.photo ? (
                  <img src={emp.photo} alt="Фото" className="h-12 w-12 rounded-full" />
                ) : (
                  <span className="text-gray-400">📷 Нет фото</span>
                )}
              </td>
              <td className="px-4 py-2">{emp.name}</td>
              <td className="px-4 py-2">{emp.role}</td>
              <td className="px-4 py-2">{emp.experience}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-md text-white ${
                    emp.lastSafetyCheck
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  }`}
                >
                  {emp.lastSafetyCheck ? '✅ Пройдено' : '❌ Не пройдено'}
                </span>
              </td>
              <td className="px-4 py-2 flex space-x-2">
                <Link
                  href={`/employees/${emp.id}`}
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