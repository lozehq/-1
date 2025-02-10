import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './WorkExperience.css';

const workExperienceData = [
  {
    title: "新媒体运营总监",
    company: "湖南颜商科技有限公司",
    period: "2023年 - 2024年",
    description: "负责社交媒体平台和AI产品推广，成功将公司在各大平台的影响力提升到新高度。",
    highlights: [
      "制定并执行跨平台社交媒体战略，覆盖抖音、哔哩哔哩、小红书等主要渠道",
      "领导团队创作高质量内容，显著提升品牌知名度和用户参与度",
      "与产品团队紧密合作，确保AI产品特性得到有效展示和推广",
      "建立和维护KOL合作关系，扩大品牌影响力"
    ],
    achievements: [
      { label: "粉丝增长", value: "21万+" },
      { label: "最高月收入", value: "8万元" },
      { label: "私域用户", value: "15万+" },
      { label: "累计营收", value: "50万元" }
    ],
    skills: ["社交媒体运营", "AI产品推广", "内容创作", "用户增长", "数据分析", "KOL管理"]
  },
  {
    title: "AI产品经理",
    company: "深圳智能科技有限公司",
    period: "2022年 - 2023年",
    description: "主导AI产品的规划和开发，推动产品从概念到成功上线。",
    highlights: [
      "负责AI产品的全周期管理，包括需求分析、功能设计和迭代优化",
      "带领团队完成产品开发和上线，实现用户快速增长",
      "建立数据分析体系，持续优化产品体验",
      "协调技术团队和设计团队，确保产品高质量交付"
    ],
    achievements: [
      { label: "用户规模", value: "30万+" },
      { label: "月活用户", value: "5万+" },
      { label: "用户满意度", value: "98%" },
      { label: "产品收入", value: "100万+" }
    ],
    skills: ["产品规划", "项目管理", "用户研究", "数据分析", "团队协作", "AI算法"]
  }
];

const WorkExperience = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % workExperienceData.length);
  };

  const experience = workExperienceData[currentIndex];

  return (
    <motion.div 
      className="work-experience"
      drag
      dragMomentum={false}
      dragElastic={0.1}
      dragConstraints={{ left: -500, right: 500, top: -300, bottom: 300 }}
      whileDrag={{ scale: 1.02 }}
      animate={dragPosition}
      onDragEnd={(event, info) => {
        setDragPosition({ x: dragPosition.x + info.offset.x, y: dragPosition.y + info.offset.y });
      }}
    >
      <div className="work-content">
        <h2>{experience.title}</h2>
        <div className="company-info">
          <span>{experience.company}</span>
          <span className="date">{experience.period}</span>
        </div>
        <p className="responsibility">{experience.description}</p>
        
        <div className="work-highlights">
          <h3>工作亮点:</h3>
          <ul>
            {experience.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </div>

        <div className="achievements">
          {experience.achievements.map((achievement, index) => (
            <div key={index} className="achievement-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
              <span>{achievement.label}</span>
              <span>{achievement.value}</span>
            </div>
          ))}
        </div>

        <div className="skills">
          {experience.skills.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>

      <div className="awards-showcase">
        <div className="award-item">
          <img src="/bilibili-award.jpg" alt="哔哩哔哩平台认证" />
          <div className="award-title">哔哩哔哩平台认证</div>
        </div>
        <div className="award-item">
          <img src="/ai-cert.jpg" alt="生成式AI应用师证书" />
          <div className="award-title">生成式AI应用师证书</div>
        </div>
      </div>

      <div className="next-arrow" onClick={handleNext}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="8 4 17 12 8 20"></polyline>
        </svg>
      </div>
    </motion.div>
  );
};

export default WorkExperience; 