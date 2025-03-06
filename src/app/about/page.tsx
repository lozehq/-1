'use client';

import { Cpu, Globe, Shield, Users, MessageSquare, BarChart } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    icon: Cpu,
    title: '先进技术',
    description: '采用AI智能算法和大数据分析，实现精准的流量分发和用户触达。',
  },
  {
    icon: Globe,
    title: '全球网络',
    description: '依托全球化的服务器集群，确保服务的稳定性和高效性。',
  },
  {
    icon: Shield,
    title: '安全保障',
    description: '严格的安全审核机制，保护用户账号和数据安全。',
  },
  {
    icon: Users,
    title: '专业团队',
    description: '拥有多年社交媒体运营经验的专业团队提供支持。',
  },
  {
    icon: MessageSquare,
    title: '贴心服务',
    description: '7*24小时客服支持，及时响应用户需求。',
  },
  {
    icon: BarChart,
    title: '数据驱动',
    description: '详细的数据分析报告，助力内容优化和效果提升。',
  },
];

const stats = [
  { label: '服务客户数', value: '10,000+' },
  { label: '平均增长率', value: '300%' },
  { label: '服务好评率', value: '98%' },
  { label: '成功案例数', value: '5,000+' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-900 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            关于我们
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            我们是专业的社交媒体流量优化服务提供商，
            致力于帮助创作者和品牌在数字世界获得更好的曝光和影响力。
          </p>
        </div>

        {/* Company Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="relative aspect-video rounded-2xl overflow-hidden">
            <Image
              src="https://picsum.photos/800/600?random=31"
              alt="公司简介"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-100 mb-4">
              专注于社交媒体流量优化
            </h2>
            <p className="text-gray-400 mb-6">
              成立于2020年，我们始终专注于为客户提供最专业的社交媒体流量优化服务。
              通过持续的技术创新和服务优化，我们帮助众多创作者和品牌实现快速增长。
            </p>
            <p className="text-gray-400">
              我们的使命是让每一个优质内容创作者都能获得应有的关注，
              让有价值的内容能够触达更多受众。通过专业的技术和服务，
              我们致力于打造一个更加开放、高效的内容分发生态。
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800/50 rounded-2xl p-6 text-center border border-gray-700/50"
            >
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-100 mb-12">
            我们的优势
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gray-800/50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">
            联系我们
          </h2>
          <p className="text-gray-400 mb-6">
            如果您有任何问题或需求，欢迎随时与我们联系。
            我们的专业团队将为您提供最优质的服务。
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors">
              在线咨询
            </button>
            <button className="px-6 py-3 rounded-xl bg-gray-700 text-gray-100 font-medium hover:bg-gray-600 transition-colors">
              商务合作
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 