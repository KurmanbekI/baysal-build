'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddStockItemForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    unit: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch('/api/stock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        category: formData.category,
        quantity: parseInt(formData.quantity),
        unit: formData.unit,
        description: formData.description,
      }),
    });

    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="name"
        placeholder="Название материала"
        className="border p-2 rounded-md shadow-sm w-full"
        onChange={handleChange}
        required
      />

      <select
        name="category"
        className="border p-2 rounded-md shadow-sm w-full"
        onChange={handleChange}
        required
      >
        <option value="">🗂 Выбрать категорию</option>
        <option value="Электрика">💡 Электрика</option>
        <option value="Металл">⚙️ Металл</option>
        <option value="Авто">🚗 Авто</option>
        <option value="Канализация">🚰 Канализация</option>
      </select>

      <input
        name="quantity"
        type="number"
        placeholder="Количество"
        className="border p-2 rounded-md shadow-sm w-full"
        onChange={handleChange}
        required
      />

      <input
        name="unit"
        placeholder="Единица измерения (шт, м, кг)"
        className="border p-2 rounded-md shadow-sm w-full"
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Описание (необязательно)"
        className="border p-2 rounded-md shadow-sm w-full"
        onChange={handleChange}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        ➕ Добавить материал
      </button>
    </form>
  );
}