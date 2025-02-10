import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import "./TrueFocus.css";

const TrueFocus = ({
  sentence = "True Focus",
  manualMode = false,
  blurAmount = 5,
  borderColor = "green",
  glowColor = "rgba(0, 255, 0, 0.6)",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
}) => {
  const [mainText, translationText] = sentence.split('|');
  const mainWords = mainText.split(" ");
  const translationWords = translationText.split(" ");
  
  // 将翻译文本重新组织，确保与中文对应
  const groupedTranslations = mainWords.map((_, index) => {
    if (index === 0) return translationWords[0]; // "me"
    if (index === 1) return translationWords.slice(1).join(" "); // "resume website"
    return "";
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState(null);
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isInitialized, setIsInitialized] = useState(false);

  // 初始化焦点框位置
  useEffect(() => {
    if (!containerRef.current || !wordRefs.current[0]) return;

    const initializePosition = () => {
      const parentRect = containerRef.current.getBoundingClientRect();
      const activeRect = wordRefs.current[0].getBoundingClientRect();

      setFocusRect({
        x: activeRect.left - parentRect.left,
        y: activeRect.top - parentRect.top,
        width: activeRect.width,
        height: activeRect.height,
      });
      setIsInitialized(true);
    };

    // 等待一帧以确保DOM已更新
    requestAnimationFrame(initializePosition);
  }, []);

  useEffect(() => {
    if (!manualMode && isInitialized) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % mainWords.length);
      }, (animationDuration + pauseBetweenAnimations) * 1000);

      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, mainWords.length, isInitialized]);

  useEffect(() => {
    if (currentIndex === null || currentIndex === -1 || !isInitialized) return;

    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const mainWordElement = wordRefs.current[currentIndex];
    const mainWordRect = mainWordElement.getBoundingClientRect();
    const translationElement = mainWordElement.parentElement.querySelector('.translation');
    const translationRect = translationElement.getBoundingClientRect();

    // 计算中英文的整体中心和边界
    const centerX = (mainWordRect.left + mainWordRect.right) / 2;
    const maxWidth = Math.max(mainWordRect.width, translationRect.width);
    const totalHeight = translationRect.bottom - mainWordRect.top;
    
    // 添加紧凑的内边距
    const paddingX = 12; // 水平内边距
    const paddingY = 6;  // 垂直内边距

    setFocusRect({
      x: centerX - maxWidth/2 - paddingX - parentRect.left,
      y: mainWordRect.top - paddingY - parentRect.top,
      width: maxWidth + paddingX * 2,
      height: totalHeight + paddingY * 2
    });
  }, [currentIndex, mainWords.length, isInitialized]);

  const handleMouseEnter = (index) => {
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode) {
      setCurrentIndex(lastActiveIndex);
    }
  };

  return (
    <div className="focus-container" ref={containerRef}>
      <div className="text-container">
        {mainWords.map((word, index) => (
          <div key={index} className="word-group">
            <span
              ref={(el) => (wordRefs.current[index] = el)}
              className={`focus-word ${manualMode ? "manual" : ""} ${
                currentIndex === index && !manualMode ? "active" : ""
              }`}
              style={{
                filter:
                  manualMode
                    ? currentIndex === index
                      ? `blur(0px)`
                      : `blur(${blurAmount}px)`
                    : currentIndex === index
                    ? `blur(0px)`
                    : `blur(${blurAmount}px)`,
                "--border-color": borderColor,
                "--glow-color": glowColor,
                transition: `filter ${animationDuration}s ease`,
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {word}
            </span>
            <span
              className={`focus-word translation ${
                currentIndex === index && !manualMode ? "active" : ""
              }`}
              style={{
                filter:
                  manualMode
                    ? currentIndex === index
                      ? `blur(0px)`
                      : `blur(${blurAmount}px)`
                    : currentIndex === index
                    ? `blur(0px)`
                    : `blur(${blurAmount}px)`,
                "--border-color": borderColor,
                "--glow-color": glowColor,
                transition: `filter ${animationDuration}s ease`,
              }}
            >
              {groupedTranslations[index]}
            </span>
          </div>
        ))}
      </div>

      <motion.div
        className="focus-frame"
        initial={false}
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: isInitialized ? 1 : 0,
        }}
        transition={{
          duration: animationDuration,
        }}
        style={{
          "--border-color": borderColor,
          "--glow-color": glowColor,
        }}
      >
        <span className="corner top-left"></span>
        <span className="corner top-right"></span>
        <span className="corner bottom-left"></span>
        <span className="corner bottom-right"></span>
      </motion.div>
    </div>
  );
};

export default TrueFocus; 