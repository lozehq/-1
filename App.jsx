import React, { useState, useEffect } from 'react';
import Aurora from './Aurora';
import TrueFocus from './TrueFocus';
import TiltedCard from './TiltedCard';
import DecryptedText from './DecryptedText';
import { TypingAnimation } from './TypingAnimation';
import BlurText from './BlurText';
import WorkExperience from './WorkExperience';
import MySkills from './MySkills';
import WorkPhotos from './WorkPhotos';
import { motion, AnimatePresence } from 'framer-motion';

import './App.css';

function App() {
  const [showWorkExperience, setShowWorkExperience] = useState(true);
  const [showMySkills, setShowMySkills] = useState(false);
  const [showWorkPhotos, setShowWorkPhotos] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleWorkExperience = () => {
    setShowWorkExperience(!showWorkExperience);
    setShowMySkills(false);
    setShowWorkPhotos(false);
  };

  const toggleMySkills = () => {
    setShowMySkills(!showMySkills);
    setShowWorkExperience(false);
    setShowWorkPhotos(false);
  };

  const toggleWorkPhotos = () => {
    setShowWorkPhotos(!showWorkPhotos);
    setShowWorkExperience(false);
    setShowMySkills(false);
  };

  return (
    <div className="app">
      <div className="mobile-notice">
        <img src="/avatar.jpg" alt="头像" />
        <h2>请使用电脑打开哦 😊</h2>
        <p>为了给您提供最佳的浏览体验，请使用电脑访问本网站</p>
      </div>
      
      <div className="aurora-wrapper">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          speed={0.5}
          amplitude={1.2}
        />
      </div>
      <div className="content-wrapper">
        <div className="nav-text" onClick={toggleWorkExperience} style={{ cursor: 'pointer' }}>
          <div className="word-group">
            <BlurText 
              text="工作经验" 
              delay={300}
              duration={1.5}
              blurAmount={10}
            />
            <BlurText 
              text="Work Experience"
              delay={400}
              duration={1.5}
              blurAmount={10}
              style={{
                fontSize: '1.2rem',
                opacity: 0.8,
                marginTop: '0.15rem',
                fontWeight: '900',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
              }}
            />
          </div>
        </div>
        
        <div className="nav-text second" onClick={toggleMySkills} style={{ cursor: 'pointer' }}>
          <div className="word-group">
            <BlurText 
              text="我的技能" 
              delay={300}
              duration={1.5}
              blurAmount={10}
            />
            <BlurText 
              text="My Skills"
              delay={400}
              duration={1.5}
              blurAmount={10}
              style={{
                fontSize: '1.2rem',
                opacity: 0.8,
                marginTop: '0.15rem',
                fontWeight: '900',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
              }}
            />
          </div>
        </div>

        <div className="nav-text third" onClick={toggleWorkPhotos} style={{ cursor: 'pointer' }}>
          <div className="word-group">
            <BlurText 
              text="工作回顾-照片" 
              delay={300}
              duration={1.5}
              blurAmount={10}
            />
            <BlurText 
              text="Work Review-Photos"
              delay={400}
              duration={1.5}
              blurAmount={10}
              style={{
                fontSize: '1.2rem',
                opacity: 0.8,
                marginTop: '0.15rem',
                fontWeight: '900',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
              }}
            />
          </div>
        </div>
        <div className="true-focus-wrapper">
          <TrueFocus 
            sentence="贺明泽 简历网站|Me Resume Website"
            manualMode={false}
            blurAmount={5}
            borderColor="#00D8FF"
            glowColor="rgba(0, 216, 255, 0.6)"
            animationDuration={2}
            pauseBetweenAnimations={1}
          />
        </div>

        <AnimatePresence>
          {showWorkExperience && (
            <motion.div 
              className="work-experience-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.3,
                ease: "easeInOut"
              }}
            >
              <WorkExperience />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showMySkills && (
            <MySkills />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showWorkPhotos && (
            <WorkPhotos />
          )}
        </AnimatePresence>

        <div className="main-content">
          <div className="content-column">
            <div className="left-section">
              <TiltedCard
                imageSrc="/avatar.jpg"
                altText="个人头像"
                captionText="新媒体总监"
                containerHeight="180px"
                containerWidth="180px"
                imageHeight="180px"
                imageWidth="180px"
                rotateAmplitude={12}
                scaleOnHover={1.15}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <div className="card-overlay">
                    <h2>个人简介</h2>
                    <p>新媒体总监</p>
                    <p>大学本科</p>
                  </div>
                }
              />
              <div className="decrypted-text-wrapper">
                <DecryptedText
                  text="姓名：贺明泽"
                  speed={120}
                  maxIterations={17}
                  sequential={true}
                  revealDirection="center"
                  useOriginalCharsOnly={false}
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
                  className="decrypted-text"
                  encryptedClassName="encrypted-text"
                  animateOn="view"
                />
                <DecryptedText
                  text="年龄：21岁"
                  speed={120}
                  maxIterations={17}
                  sequential={true}
                  revealDirection="center"
                  useOriginalCharsOnly={false}
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
                  className="decrypted-text"
                  encryptedClassName="encrypted-text"
                  animateOn="view"
                />
                <DecryptedText
                  text="学历：大学本科"
                  speed={120}
                  maxIterations={17}
                  sequential={true}
                  revealDirection="center"
                  useOriginalCharsOnly={false}
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
                  className="decrypted-text"
                  encryptedClassName="encrypted-text"
                  animateOn="view"
                />
                <DecryptedText
                  text="求职意向：新媒体总监"
                  speed={120}
                  maxIterations={17}
                  sequential={true}
                  revealDirection="center"
                  useOriginalCharsOnly={false}
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
                  className="decrypted-text"
                  encryptedClassName="encrypted-text"
                  animateOn="view"
                />
              </div>
            </div>

            {/* 奖牌和证书部分 */}
            <div className="honors-section">
              <h2 className="honors-title">奖牌和证书</h2>
              <div className="honors-list">
                <div className="honor-item">
                  <div className="honor-icon blue">
                    <svg viewBox="0 0 24 24" fill="none" className="honor-svg">
                      <path d="M12 15C15.866 15 19 11.866 19 8C19 4.134 15.866 1 12 1C8.13401 1 5 4.134 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="honor-content">
                    <h3>哔哩哔哩平台认证</h3>
                    <p>10万粉丝实体奖牌和证书</p>
                  </div>
                </div>
                <div className="honor-item">
                  <div className="honor-icon purple">
                    <svg viewBox="0 0 24 24" fill="none" className="honor-svg">
                      <path d="M12 15C15.866 15 19 11.866 19 8C19 4.134 15.866 1 12 1C8.13401 1 5 4.134 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="honor-content">
                    <h3>生成式AI应用师</h3>
                    <p>工信和信息化部工业文化发展中心颁发高级证书</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部联系方式 */}
        <div className="bottom-contact">
          <div className="contact-info">
            <TypingAnimation className="contact-text" delay={500}>
              <span className="contact-label">QQ/邮件：</span>
              <span className="contact-value">1940231594@qq.com</span>
            </TypingAnimation>
            <div className="wechat-container">
              <TypingAnimation className="contact-text" delay={800}>
                <span className="contact-label">微信：</span>
                <span className="contact-value">AP1940231594</span>
              </TypingAnimation>
              <img 
                src="/WeChat QR Code.jpg" 
                alt="WeChat QR Code" 
                className="wechat-qr"
              />
            </div>
            <TypingAnimation className="contact-text blog-link" delay={1100}>
              <span className="contact-label">个人博客：</span>
              <span className="contact-value">
                <a href="https://aigcjws.us.kg" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff' }}>aigcjws.us.kg</a>
              </span>
            </TypingAnimation>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 