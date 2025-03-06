const { PrismaClient } = require('@prisma/client');
const { nanoid } = require('nanoid');

const prisma = new PrismaClient();

// 生成卡密
function generateCardKey() {
  return nanoid(16).toUpperCase();
}

async function main() {
  try {
    // 查找管理员用户
    const admin = await prisma.user.findFirst({
      where: {
        role: 'ADMIN'
      }
    });

    if (!admin) {
      console.error('未找到管理员用户');
      return;
    }

    const amount = 100; // 充值金额
    const count = 5;    // 生成数量
    const batch = 'test'; // 批次号
    const description = '测试卡密'; // 描述

    const cardKeys = [];

    // 生成指定数量的卡密
    for (let i = 0; i < count; i++) {
      const code = generateCardKey();
      cardKeys.push(code);
      
      // 创建卡密记录
      await prisma.cardKey.create({
        data: {
          code,
          amount,
          batch,
          description,
          createdBy: admin.id,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30天后过期
        }
      });
    }

    console.log('生成的卡密：');
    cardKeys.forEach(key => console.log(key));

  } catch (error) {
    console.error('生成卡密失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 