import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BlurText = ({ text, delay = 0, duration = 1.5, blurAmount = 10, style = {} }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const variants = {
    hidden: {
      filter: `blur(${blurAmount}px)`,
      opacity: 0,
    },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      transition: {
        duration: duration,
        ease: 'easeOut',
      },
    },
  };

  const defaultStyle = {
    color: '#ffffff',
    fontSize: '3rem',
    fontWeight: '900',
    textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
    fontFamily: '"AlibabaPuHuiTi-Black", sans-serif',
    lineHeight: '1.1',
    ...style
  };

  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={variants}
      style={defaultStyle}
    >
      {text}
    </motion.div>
  );
};

export default BlurText; 