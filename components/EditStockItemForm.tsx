'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditStockItemForm({ item }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    unit: '',
    description: '',
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        category: item.category,
        quantity: item.quantity.toString(),
        unit: item.unit,
        description: item.description || '',
      });
    }
  }, [item]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`/api/stock/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    router.refresh();
  };

  const handleDelete = async () => {
    await fetch(`/api/stock/${item.id}`, {
      method: 'DELETE',
    });

    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        placeholder="Название материала"
        onChange={handleChange}
        required
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      >
        <option value="">Выбрать категорию</option>
        <option value="Электрика">Электрика</option>
        <option value="Металл">Металл</option>
        <option value="Авто">Авто</option>
        <option value="Канализация">Канализация</option>
      </select>
      <input
        name="quantity"
        type="number"
        value={formData.quantity}
        placeholder="Количество"
        onChange={handleChange}
        required
      />
      <input
        name="unit"
        value={formData.unit}
        placeholder="Единица измерения"
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        value={formData.description}
        placeholder="Описание"
        onChange={handleChange}
      />
      <button type="submit">Сохранить изменения</button>
      <button type="button" onClick={handleDelete}>
        Удалить материал
      </button>
    </form>
  );
}
