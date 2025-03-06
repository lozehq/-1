'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';

export default function CardKeysPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [amount, setAmount] = useState('');
  const [count, setCount] = useState('');
  const [batch, setBatch] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [generatedKeys, setGeneratedKeys] = useState<string[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (session?.user && session.user.role !== 'ADMIN') {
      router.push('/');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!session || session.user.role !== 'ADMIN') {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    setGeneratedKeys([]);

    try {
      const response = await fetch('/api/admin/cardkeys/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseInt(amount),
          count: parseInt(count),
          batch,
          description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '生成失败');
      }

      setSuccess('卡密生成成功！');
      setGeneratedKeys(data.cardKeys);
      setAmount('');
      setCount('');
      setBatch('');
      setDescription('');
      router.refresh();
    } catch (error: any) {
      setError(error.message || '生成失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            生成卡密
          </h1>
          <p className="mt-2 text-gray-400">
            批量生成充值卡密
          </p>
        </div>

        <div className="mt-8 bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-700/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 text-red-400 px-4 py-3 rounded-xl text-sm text-center">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-500/10 text-green-400 px-4 py-3 rounded-xl text-sm text-center">
                {success}
              </div>
            )}

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-300">
                充值金额
              </label>
              <input
                id="amount"
                name="amount"
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 block w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                placeholder="请输入充值金额"
              />
            </div>

            <div>
              <label htmlFor="count" className="block text-sm font-medium text-gray-300">
                生成数量
              </label>
              <input
                id="count"
                name="count"
                type="number"
                required
                value={count}
                onChange={(e) => setCount(e.target.value)}
                className="mt-1 block w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                placeholder="请输入生成数量"
              />
            </div>

            <div>
              <label htmlFor="batch" className="block text-sm font-medium text-gray-300">
                批次号
              </label>
              <input
                id="batch"
                name="batch"
                type="text"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="mt-1 block w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                placeholder="请输入批次号（可选）"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                描述
              </label>
              <input
                id="description"
                name="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                placeholder="请输入描述（可选）"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !amount || !count}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  生成中...
                </>
              ) : (
                '生成卡密'
              )}
            </button>
          </form>

          {generatedKeys.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-300 mb-4">生成的卡密：</h3>
              <div className="bg-gray-900/50 rounded-xl p-4 space-y-2">
                {generatedKeys.map((key, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <code className="text-blue-400">{key}</code>
                    <button
                      onClick={() => navigator.clipboard.writeText(key)}
                      className="text-sm text-gray-400 hover:text-white"
                    >
                      复制
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 