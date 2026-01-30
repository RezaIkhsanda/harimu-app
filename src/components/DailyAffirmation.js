import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getDailyAffirmation, getRandomAffirmation } from '../data/affirmations';
import useResponsive from '../hooks/useResponsive';

const DailyAffirmation = ({ showRefresh = true }) => {
  const [affirmation, setAffirmation] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { isMobile, responsive } = useResponsive();

  useEffect(() => {
    // Get daily affirmation on mount
    setAffirmation(getDailyAffirmation());
    // Delay showing for smooth entrance
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setIsVisible(false);
    
    setTimeout(() => {
      setAffirmation(getRandomAffirmation());
      setIsVisible(true);
      setIsRefreshing(false);
    }, 400);
  };

  const containerStyle = {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 247, 250, 0.9) 100%)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 183, 197, 0.3)',
    borderRadius: responsive('16px', '18px', '20px'),
    padding: responsive('16px 18px', '18px 22px', '20px 24px'),
    marginBottom: responsive('20px', '24px', '28px'),
    position: 'relative',
    overflow: 'hidden',
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: responsive('11px', '11px', '12px'),
    fontWeight: '600',
    color: '#FFB7C5',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: responsive('10px', '11px', '12px'),
  };

  const quoteStyle = {
    fontSize: responsive('14px', '15px', '16px'),
    color: '#5D5D5D',
    lineHeight: '1.7',
    fontStyle: 'italic',
    margin: 0,
  };

  const emojiStyle = {
    fontSize: responsive('28px', '32px', '36px'),
    position: 'absolute',
    top: responsive('12px', '14px', '16px'),
    right: responsive('14px', '16px', '18px'),
    opacity: 0.6,
  };

  const refreshButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    marginTop: responsive('12px', '14px', '16px'),
    padding: responsive('8px 14px', '9px 16px', '10px 18px'),
    fontSize: responsive('11px', '11px', '12px'),
    fontWeight: '500',
    color: '#8A8A8A',
    background: 'rgba(255, 255, 255, 0.6)',
    border: '1px solid rgba(167, 199, 231, 0.3)',
    borderRadius: responsive('8px', '9px', '10px'),
    cursor: 'pointer',
    touchAction: 'manipulation',
    width: 'fit-content',
  };

  // Decorative sparkles
  const sparklePositions = [
    { top: '20%', left: '5%' },
    { top: '60%', left: '8%' },
    { bottom: '15%', right: '25%' },
  ];

  if (!affirmation) return null;

  return (
    <motion.div
      style={containerStyle}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Decorative sparkles */}
      {!isMobile && sparklePositions.map((pos, index) => (
        <motion.div
          key={index}
          style={{
            position: 'absolute',
            ...pos,
            fontSize: '10px',
            opacity: 0.4,
            pointerEvents: 'none',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.5,
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Emoji decoration */}
      <motion.div
        style={emojiStyle}
        animate={{ rotate: [0, 5, -5, 0], y: [0, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {affirmation.emoji}
      </motion.div>

      {/* Label */}
      <div style={labelStyle}>
        <span>✨</span>
        <span>Pengingat Hari Ini</span>
      </div>

      {/* Quote */}
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.p
            key={affirmation.id}
            style={quoteStyle}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            "{affirmation.text}"
          </motion.p>
        )}
      </AnimatePresence>

      {/* Refresh button */}
      {showRefresh && (
        <motion.button
          style={refreshButtonStyle}
          onClick={handleRefresh}
          disabled={isRefreshing}
          whileHover={{ 
            background: 'rgba(255, 255, 255, 0.9)',
            borderColor: '#A7C7E7'
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            animate={isRefreshing ? { rotate: 360 } : {}}
            transition={{ duration: 0.5, ease: 'linear' }}
          >
            🔄
          </motion.span>
          <span>Afirmasi lain</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default DailyAffirmation;
