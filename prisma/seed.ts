import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Kurmanbek_1200', 10);

  await prisma.user.create({
    data: {
      username: 'kurmanbek',
      passwordHash: passwordHash,
      role: 'admin',
    },
  });

  console.log("✅ Пользователь kurmanbek успешно создан с username!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });