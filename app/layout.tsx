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
              <li><a href="/dashboard">Панель управления</a></li>
              <li><a href="/employees">Сотрудники</a></li>
              <li><a href="/projects">Проекты</a></li>
              <li><a href="/stock">Склад</a></li>
              <li><a href="/reports">Отчёты</a></li>
              <li><a href="/admin">Админ-панель</a></li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </body>
    </html>
  );
}
