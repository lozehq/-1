import React from 'react';
import { motion } from 'framer-motion';
import './MySkills.css';

const skillsData = {
  "AI语言模型": [
    { name: "ChatGPT", proficiency: 95 },
    { name: "Claude-3-5", proficiency: 90 },
    { name: "Grok-2", proficiency: 85 },
    { name: "Gemini-1.5", proficiency: 88 },
    { name: "Deepseek", proficiency: 82 }
  ],
  "AI创作工具": [
    { name: "ComfyUI", proficiency: 80 },
    { name: "Stable Diffusion", proficiency: 85 },
    { name: "Midjourney", proficiency: 92 },
    { name: "Runway", proficiency: 75 },
    { name: "Sora", proficiency: 70 }
  ],
  "设计工具": [
    { name: "Photoshop", proficiency: 88 },
    { name: "Premiere", proficiency: 85 },
    { name: "After Effects", proficiency: 80 },
    { name: "C4D", proficiency: 75 }
  ]
};

const MySkills = () => {
  return (
    <motion.div 
      className="skills-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="skills-content">
        {Object.entries(skillsData).map(([category, skills]) => (
          <div key={category} className="skill-category">
            <h2>{category}</h2>
            <div className="skill-list">
              {skills.map((skill) => (
                <div key={skill.name} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.proficiency}%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <motion.div 
                      className="skill-bar-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.proficiency}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default MySkills; 