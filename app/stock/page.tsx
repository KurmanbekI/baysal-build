'use client';

import { useState, useEffect } from 'react';
import EditStockItemForm from '@/components/EditStockItemForm';
import AddStockItemForm from '@/components/AddStockItemForm';

export default function StockPage() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('');

  const fetchItems = async () => {
    const res = await fetch('/api/stock');
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const filteredItems = category
    ? items.filter((item) => item.category === category)
    : items;

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">📦 Склад материалов</h1>

      <div className="mb-4 flex items-center space-x-4">
        <select
          className="border p-2 rounded-md shadow-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">🗂 Все категории</option>
          <option value="Электрика">💡 Электрика</option>
          <option value="Металл">⚙️ Металл</option>
          <option value="Авто">🚗 Авто</option>
          <option value="Канализация">🚰 Канализация</option>
        </select>
      </div>

      <table className="w-full border-collapse rounded-md overflow-hidden shadow-lg">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Название</th>
            <th className="px-4 py-2 text-left">Категория</th>
            <th className="px-4 py-2 text-left">Количество</th>
            <th className="px-4 py-2 text-left">Ед. измерения</th>
            <th className="px-4 py-2">Действия</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.category}</td>
              <td className="px-4 py-2">{item.quantity}</td>
              <td className="px-4 py-2">{item.unit}</td>
              <td className="px-4 py-2 flex justify-center">
                <EditStockItemForm item={item} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-10 p-6 bg-gray-100 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">➕ Добавить новый материал</h2>
        <AddStockItemForm />
      </div>
    </div>
  );
}