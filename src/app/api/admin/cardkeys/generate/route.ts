import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { nanoid } from 'nanoid';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

// 生成卡密
function generateCardKey() {
  return nanoid(16).toUpperCase();
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '请先登录' },
        { status: 401 }
      );
    }

    // 检查用户是否是管理员
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: '权限不足' },
        { status: 403 }
      );
    }

    const { amount, count, batch, description } = await req.json();

    if (!amount || !count || amount <= 0 || count <= 0) {
      return NextResponse.json(
        { error: '请输入有效的金额和数量' },
        { status: 400 }
      );
    }

    const cardKeys: string[] = [];

    // 使用事务确保所有卡密都创建成功
    await prisma.$transaction(async (tx) => {
      for (let i = 0; i < count; i++) {
        const code = generateCardKey();
        cardKeys.push(code);
        
        await tx.cardKey.create({
          data: {
            code,
            amount,
            batch,
            description,
            createdBy: user.id,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30天后过期
          }
        });
      }
    });

    return NextResponse.json({
      message: '卡密生成成功',
      cardKeys,
    });

  } catch (error: any) {
    console.error('生成卡密失败:', error);
    return NextResponse.json(
      { error: error.message || '生成失败' },
      { status: 500 }
    );
  }
} 