import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './WorkPhotos.css';

const photos = [
  {
    id: 1,
    image: "work-photos/photo1.jpg",
    title: "地图适用于您的iPhone 15 Pro Max",
    category: "产品",
    description: "优化地图应用程序界面，提供更好的用户体验。"
  },
  {
    id: 2,
    image: "work-photos/photo2.jpg",
    title: "摄影变得更好了",
    category: "iOS",
    description: "通过先进的图像处理技术，提升照片质量。"
  },
  {
    id: 3,
    image: "/work-photos/photo3.jpg",
    title: "招聘员工",
    category: "招聘",
    description: "扩大团队规模，寻找优秀人才。"
  },
  {
    id: 4,
    image: "/work-photos/photo4.jpg",
    title: "AI助手开发",
    category: "AI开发",
    description: "开发智能AI助手，提升工作效率。"
  },
  {
    id: 5,
    image: "/work-photos/photo5.jpg",
    title: "数据分析平台",
    category: "数据",
    description: "构建数据分析平台，助力决策制定。"
  },
  {
    id: 6,
    image: "/work-photos/photo6.jpg",
    title: "用户界面设计",
    category: "UI设计",
    description: "创新的用户界面设计，提升用户体验。"
  },
  {
    id: 7,
    image: "/work-photos/photo7.jpg",
    title: "团队协作",
    category: "团队",
    description: "高效的团队协作，共同实现目标。"
  },
  {
    id: 8,
    image: "/work-photos/photo8.jpg",
    title: "产品展示",
    category: "展示",
    description: "精美的产品展示，突出核心特点。"
  },
  {
    id: 9,
    image: "/work-photos/photo9.jpg",
    title: "技术创新",
    category: "创新",
    description: "持续的技术创新，引领行业发展。"
  },
  {
    id: 10,
    image: "/work-photos/photo10.jpg",
    title: "客户服务",
    category: "服务",
    description: "优质的客户服务，提供全面支持。"
  }
];

const WorkPhotos = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <motion.div 
      className="work-photos-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="photos-content">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            className="photo-slide"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="photo-wrapper">
              <img src={photos[currentIndex].image} alt={photos[currentIndex].title} />
            </div>
            <div className="photo-info">
              <span className="category">{photos[currentIndex].category}</span>
              <h2>{photos[currentIndex].title}</h2>
              <p>{photos[currentIndex].description}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <button className="nav-button prev" onClick={handlePrev}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button className="nav-button next" onClick={handleNext}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default WorkPhotos; 