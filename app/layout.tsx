import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "БАЙСАЛ БИЛД",
  description: "Управление проектами компании БАЙСАЛ БИЛД",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="flex">
        <aside className="w-64 min-h-screen bg-gray-800 text-white p-4">
          <nav>
            <ul>
            <li>
            <Link href="/dashboard" className="flex items-center p-2 rounded-md hover:bg-gray-700">
              🏠 Панель управления
            </Link>
          </li>
          <li>
            <Link href="/employees" className="flex items-center p-2 rounded-md hover:bg-gray-700">
              👥 Сотрудники
            </Link>
          </li>
          <li>
            <Link href="/projects" className="flex items-center p-2 rounded-md hover:bg-gray-700">
              🏗 Проекты
            </Link>
          </li>
          <li>
            <Link href="/stock" className="flex items-center p-2 rounded-md hover:bg-gray-700">
              📦 Склад
            </Link>
          </li>
          <li>
            <Link href="/reports" className="flex items-center p-2 rounded-md hover:bg-gray-700">
              📊 Отчёты
            </Link>
          </li>
          <li>
            <Link href="/admin" className="flex items-center p-2 rounded-md hover:bg-gray-700">
              ⚙️ Админ-панель
            </Link>
          </li>
          <li>
            <Link href="/tasks" className="flex items-center p-2 rounded-md hover:bg-gray-700">
              📝 Задания
            </Link>
          </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </body>
    </html>
  );
}
