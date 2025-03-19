'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditEmployeeForm({ employee }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    experience: '',
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        role: employee.role,
        experience: employee.experience.toString(),
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    await fetch(`/api/employees/${employee.id}`, { // ✅ вот здесь исправили адрес
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        role: formData.role,
        experience: parseInt(formData.experience),
      }),
    });
  
    router.push('/employees');
    router.refresh();
  };
  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="border px-2 py-1 w-full"
        required
      />
      <input
        type="text"
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="experience"
        value={formData.experience}
        onChange={handleChange}
        required
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Сохранить изменения
      </button>
    </form>
  );
}