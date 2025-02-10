"use client";

import React, { useEffect, useRef, useState } from "react";

export function TypingAnimation({
  children,
  className,
  duration = 100,
  delay = 0,
  as: Component = "div",
  startOnView = false,
  ...props
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const elementRef = useRef(null);
  const textContent = useRef("");

  // 递归提取文本内容
  const extractTextContent = (children) => {
    let text = "";
    React.Children.forEach(children, child => {
      if (typeof child === 'string') {
        text += child;
      } else if (React.isValidElement(child)) {
        text += extractTextContent(child.props.children);
      }
    });
    return text;
  };

  // 递归构建带样式的文本
  const buildStyledText = (children, displayText) => {
    let currentPos = 0;
    
    return React.Children.map(children, child => {
      if (typeof child === 'string') {
        const chunk = displayText.substring(currentPos, currentPos + child.length);
        currentPos += child.length;
        return chunk;
      }
      
      if (React.isValidElement(child)) {
        const childText = extractTextContent(child.props.children);
        const chunk = displayText.substring(currentPos, currentPos + childText.length);
        currentPos += childText.length;
        
        return React.cloneElement(child, {
          ...child.props,
          children: buildStyledText(child.props.children, chunk)
        });
      }
      
      return child;
    });
  };

  useEffect(() => {
    textContent.current = extractTextContent(children);
  }, [children]);

  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        setStarted(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setStarted(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, startOnView]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < textContent.current.length) {
        const currentText = textContent.current.substring(0, i + 1);
        setDisplayedText(currentText);
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [started, duration]);

  const styledContent = buildStyledText(children, displayedText);

  return (
    <Component
      ref={elementRef}
      className={className}
      {...props}
    >
      {styledContent}
    </Component>
  );
} 