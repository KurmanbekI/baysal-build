'use client';

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// ✅ Явно регистрируем необходимые компоненты Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function StockChart() {
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
        console.log('Данные отчётов:', data);
        setReport(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Ошибка загрузки графика:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Проверка на пустые данные
  if (loading) return <p>⏳ Загрузка графика...</p>;
  if (error) return <p className="text-red-600">❌ Ошибка: {error}</p>;
  if (report.length === 0) return <p className="text-gray-600">📉 Нет данных для отображения графика.</p>;

  // Формирование данных для графика
  const data = {
    labels: report.map((row) => row.category || 'Неизвестно'),
    datasets: [
      {
        label: 'Количество материалов',
        data: report.map((row) => row._sum?.quantity || 0),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">📈 График складских запасов</h2>
      {report.length > 0 ? (
        <Bar data={data} options={{ responsive: true, scales: { x: { type: 'category' }, y: { beginAtZero: true } } }} />
      ) : (
        <p className="text-gray-600">📉 Нет данных для построения графика.</p>
      )}
    </div>
  );
}