'use client';

import { useState, useEffect } from 'react';
import StockChart from '@/components/StockChart';

export default function StockReportPage() {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/reports/stock')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Ошибка API: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Данные отчётов:", data);
        setReport(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки отчёта:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>⏳ Загрузка отчёта...</p>;
  if (error) return <p className="text-red-600">❌ Ошибка: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">📊 Отчёт по складу</h1>

      <table className="w-full border-collapse shadow-md">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Категория</th>
            <th className="px-4 py-2 text-left">Общее количество</th>
          </tr>
        </thead>
        <tbody>
          {report.map((row, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">{row.category || "Неизвестно"}</td>
              <td className="px-4 py-2">{row._sum?.quantity || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <StockChart />
    </div>
  );
}