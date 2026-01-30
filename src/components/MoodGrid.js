import React from 'react';
import { motion } from 'framer-motion';
import { moods } from '../data/conversationTree';
import useResponsive from '../hooks/useResponsive';
import DailyAffirmation from './DailyAffirmation';

const MoodGrid = ({ onSelectMood, userName }) => {
  const { isMobile, responsive } = useResponsive();

  const containerStyle = {
    minHeight: 'calc(100vh - env(safe-area-inset-bottom, 0px))',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: responsive('16px', '20px', '24px'),
    background: 'radial-gradient(circle at 50% 50%, #FFF5F7 0%, #F0F4FF 100%)',
    overflow: 'hidden',
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: responsive('24px', '28px', '32px'),
    padding: responsive('28px 20px', '36px 32px', '40px'),
    textAlign: 'center',
    maxWidth: responsive('100%', '460px', '480px'),
    width: '100%',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  };

  const titleStyle = {
    fontSize: responsive('20px', '22px', '24px'),
    fontWeight: '600',
    color: '#5D5D5D',
    marginBottom: '8px',
  };

  const subtitleStyle = {
    fontSize: responsive('14px', '14px', '15px'),
    color: '#8A8A8A',
    marginBottom: responsive('24px', '28px', '32px'),
    lineHeight: '1.6',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: responsive('12px', '14px', '16px'),
  };

  const moodButtonStyle = (color) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: responsive('20px 12px', '22px 14px', '24px 16px'),
    borderRadius: responsive('16px', '18px', '20px'),
    background: 'rgba(255, 255, 255, 0.8)',
    border: '2px solid rgba(255, 255, 255, 0.5)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    touchAction: 'manipulation',
  });

  const emojiContainerStyle = (color) => ({
    width: responsive('52px', '58px', '64px'),
    height: responsive('52px', '58px', '64px'),
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${color}40 0%, ${color}20 100%)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsive('10px', '11px', '12px'),
    fontSize: responsive('24px', '26px', '28px'),
  });

  const labelStyle = {
    fontSize: responsive('13px', '13px', '14px'),
    fontWeight: '600',
    color: '#5D5D5D',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div style={containerStyle}>
      <motion.div
        style={cardStyle}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <motion.div
          style={{ fontSize: responsive('40px', '44px', '48px'), marginBottom: responsive('12px', '14px', '16px') }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          ☁️
        </motion.div>

        <motion.h2
          style={titleStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Hai {userName}! ✨
        </motion.h2>

        <motion.p
          style={subtitleStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Gimana perasaan kamu hari ini?
          {!isMobile && <br />}
          {isMobile ? ' ' : ''}Pilih yang paling menggambarkan kondisimu ya... 🤍
        </motion.p>

        {/* Daily Affirmation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <DailyAffirmation showRefresh={true} />
        </motion.div>

        <motion.div
          style={gridStyle}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {moods.map((mood, index) => (
            <motion.button
              key={mood.id}
              style={moodButtonStyle(mood.color)}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                borderColor: mood.color,
                boxShadow: `0 8px 25px ${mood.color}40`
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectMood(mood.id)}
            >
              <motion.div
                style={emojiContainerStyle(mood.color)}
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {mood.emoji}
              </motion.div>
              <span style={labelStyle}>{mood.label}</span>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MoodGrid;
