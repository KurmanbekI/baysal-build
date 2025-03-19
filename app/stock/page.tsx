import { PrismaClient } from '@prisma/client';
import AddStockItemForm from '@/components/AddStockItemForm';


const prisma = new PrismaClient();

export default async function StockPage() {
  const items = await prisma.stockItem.findMany();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Склад материалов</h1>

      <table className="w-full mt-4 border-collapse">
        <thead>
          <tr>
            <th>Название</th>
            <th>Категория</th>
            <th>Количество</th>
            <th>Единица измерения</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>{item.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddStockItemForm />
    </div>
  );
}