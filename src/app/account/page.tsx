'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2, User, Package, CreditCard, Settings, Wallet, Key, ArrowUp, ArrowDown } from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

interface Transaction {
  id: string;
  amount: number;
  type: string;
  status: string;
  description: string;
  createdAt: string;
}

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  platform: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  status: string;
  createdAt: string;
  totalAmount: number;
  items: OrderItem[];
}

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userBalance, setUserBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.id) {
      Promise.all([
        fetch('/api/user/balance'),
        fetch('/api/credits/transactions'),
        fetch('/api/orders/history')
      ])
        .then(async ([balanceRes, transactionsRes, ordersRes]) => {
          const [balanceData, transactionsData, ordersData] = await Promise.all([
            balanceRes.json(),
            transactionsRes.json(),
            ordersRes.json()
          ]);

          if (balanceData.credits !== undefined) {
            setUserBalance(balanceData.credits);
          }

          setTransactions(transactionsData.transactions || []);
          setOrders(ordersData.orders || []);
        })
        .catch(error => {
          console.error('获取数据失败:', error);
          setError('获取数据失败，请刷新重试');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [session?.user?.id]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const isAdmin = session.user.role === 'ADMIN';

  return (
    <main className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            我的账户
          </h1>
          <p className="mt-2 text-gray-300">管理您的账户信息和服务设置</p>
        </div>

        {error && (
          <div className="mb-8 bg-red-500/10 text-red-400 px-4 py-3 rounded-xl text-sm text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* 个人信息卡片 */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center mb-4">
              <User className="h-6 w-6 text-blue-400" />
              <h2 className="ml-2 text-xl font-semibold text-gray-100">个人信息</h2>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-400">账号</label>
                <p className="mt-1 text-gray-200">{session.user?.partnerAccount}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">角色</label>
                <p className="mt-1 text-gray-200">{isAdmin ? '管理员' : '合作商'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">账户状态</label>
                <p className="mt-1 text-green-400">已激活</p>
              </div>
            </div>
          </div>

          {/* 余额卡片 */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center mb-4">
              <Wallet className="h-6 w-6 text-blue-400" />
              <h2 className="ml-2 text-xl font-semibold text-gray-100">账户余额</h2>
            </div>
            <div className="mt-2">
              <div className="text-3xl font-bold text-blue-400">{userBalance} 积分</div>
              <div className="mt-4 space-x-4">
                <Link
                  href="/recharge"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  充值
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 订单历史 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Package className="h-6 w-6 text-blue-400" />
                <h2 className="ml-2 text-xl font-semibold text-gray-100">订单历史</h2>
              </div>
              <Link
                href="/orders"
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                查看全部
              </Link>
            </div>
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <Link
                  key={order.id}
                  href={`/orders/${order.id}`}
                  className="block p-4 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:border-blue-500/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-gray-200">
                        {order.items.map(item => item.productName).join(', ')}
                      </p>
                      <p className="text-sm text-gray-400">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <span className="text-blue-400 font-semibold">
                      {formatPrice(order.totalAmount)}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="px-2 py-1 rounded-lg bg-green-500/20 text-green-400">
                      {order.status === 'COMPLETED' ? '已完成' : '处理中'}
                    </span>
                  </div>
                </Link>
              ))}
              {orders.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  暂无订单记录
                </div>
              )}
            </div>
          </div>

          {/* 消费记录 */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <CreditCard className="h-6 w-6 text-blue-400" />
                <h2 className="ml-2 text-xl font-semibold text-gray-100">消费记录</h2>
              </div>
              <Link
                href="/transactions"
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                查看全部
              </Link>
            </div>
            <div className="space-y-4">
              {transactions.slice(0, 5).map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/30"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {transaction.type === 'CARD_KEY' ? (
                        <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                          <ArrowUp className="h-4 w-4 text-green-400" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                          <ArrowDown className="h-4 w-4 text-red-400" />
                        </div>
                      )}
                      <div className="ml-3">
                        <p className="text-gray-200">{transaction.description}</p>
                        <p className="text-sm text-gray-400">
                          {new Date(transaction.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <span className={transaction.type === 'CARD_KEY' ? 'text-green-400' : 'text-red-400'}>
                      {transaction.type === 'CARD_KEY' ? '+' : '-'}{transaction.amount}
                    </span>
                  </div>
                </div>
              ))}
              {transactions.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  暂无消费记录
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 管理员功能卡片 */}
        {isAdmin && (
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center mb-4">
              <Settings className="h-6 w-6 text-blue-400" />
              <h2 className="ml-2 text-xl font-semibold text-gray-100">管理功能</h2>
            </div>
            <div className="space-y-4">
              <Link
                href="/admin/cardkeys"
                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white bg-gray-700/50 hover:bg-gray-700 rounded-xl transition-colors"
              >
                <Key className="h-4 w-4 mr-2" />
                生成卡密
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 