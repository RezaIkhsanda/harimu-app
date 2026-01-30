import React from 'react';
import { motion } from 'framer-motion';

const TypingIndicator = () => {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -8 }
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '16px 20px',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px 20px 20px 4px',
    width: 'fit-content',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
  };

  const dotStyle = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #FFB7C5 0%, #A7C7E7 100%)'
  };

  return (
    <motion.div
      style={containerStyle}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          style={dotStyle}
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.4,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: index * 0.15,
            ease: 'easeInOut'
          }}
        />
      ))}
    </motion.div>
  );
};

export default TypingIndicator;
