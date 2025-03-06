const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash('123123', 10);
    
    const user = await prisma.user.upsert({
      where: {
        partnerAccount: '1940231594'
      },
      update: {
        hashedPassword,
        role: 'ADMIN'
      },
      create: {
        partnerAccount: '1940231594',
        hashedPassword,
        name: '合作商',
        role: 'ADMIN',
        credits: 10000
      }
    });
    
    console.log('管理员用户创建/更新成功:', user);
  } catch (error) {
    console.error('创建管理员失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin(); 