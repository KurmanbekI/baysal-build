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
      body: JSON.stringify(formData),
    });

    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Название материала" onChange={handleChange} required />
      <select name="category" onChange={handleChange} required>
        <option value="">Выбрать категорию</option>
        <option value="Электрика">Электрика</option>
        <option value="Металл">Металл</option>
        <option value="Авто">Авто</option>
        <option value="Канализация">Канализация</option>
      </select>
      <input name="quantity" type="number" placeholder="Количество" onChange={handleChange} required />
      <input name="unit" placeholder="Единица измерения (шт, м, кг)" onChange={handleChange} required />
      <textarea name="description" placeholder="Описание (необязательно)" onChange={handleChange} />
      <button type="submit">Добавить материал</button>
    </form>
  );
}