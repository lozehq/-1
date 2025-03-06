const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // 创建默认合作商账号
  const hashedPassword = await hash('123123', 10);
  
  await prisma.user.upsert({
    where: {
      partnerAccount: '1940231594'
    },
    update: {},
    create: {
      partnerAccount: '1940231594',
      hashedPassword,
      name: '默认合作商',
      role: 'ADMIN',
      credits: 10000
    }
  });

  console.log('默认合作商账号创建成功');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 