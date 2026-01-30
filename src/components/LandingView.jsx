import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useResponsive from '../hooks/useResponsive';

const LandingView = ({ onStart }) => {
  const [name, setName] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { isMobile, responsive } = useResponsive();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

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
    padding: responsive('32px 24px', '40px 32px', '48px 40px'),
    textAlign: 'center',
    maxWidth: responsive('100%', '400px', '420px'),
    width: '100%',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    margin: responsive('0', '0 auto', '0 auto'),
  };

  const logoStyle = {
    fontSize: responsive('48px', '56px', '64px'),
    marginBottom: responsive('12px', '14px', '16px'),
  };

  const titleStyle = {
    fontSize: responsive('26px', '28px', '32px'),
    fontWeight: '700',
    color: '#5D5D5D',
    marginBottom: '8px',
    letterSpacing: '-0.5px',
  };

  const subtitleStyle = {
    fontSize: responsive('14px', '15px', '16px'),
    color: '#8A8A8A',
    marginBottom: responsive('24px', '28px', '32px'),
    lineHeight: '1.6',
  };

  const inputContainerStyle = {
    position: 'relative',
    marginBottom: responsive('20px', '22px', '24px'),
  };

  const inputStyle = {
    width: '100%',
    padding: responsive('16px 20px', '17px 22px', '18px 24px'),
    fontSize: '16px', // Keep 16px to prevent iOS zoom
    borderRadius: responsive('14px', '15px', '16px'),
    background: 'rgba(255, 255, 255, 0.9)',
    border: isFocused ? '2px solid #FFB7C5' : '2px solid rgba(255, 183, 197, 0.3)',
    color: '#5D5D5D',
    transition: 'all 0.3s ease',
    boxShadow: isFocused ? '0 0 20px rgba(255, 183, 197, 0.3)' : 'none',
    boxSizing: 'border-box',
    WebkitAppearance: 'none', // Remove iOS default styling
  };

  const buttonStyle = {
    width: '100%',
    padding: responsive('16px 28px', '17px 30px', '18px 32px'),
    fontSize: responsive('15px', '15px', '16px'),
    fontWeight: '600',
    borderRadius: responsive('14px', '15px', '16px'),
    background: 'linear-gradient(135deg, #FFB7C5 0%, #FFD4DD 100%)',
    color: '#5D5D5D',
    border: 'none',
    cursor: name.trim() ? 'pointer' : 'not-allowed',
    opacity: name.trim() ? 1 : 0.6,
    boxShadow: '0 4px 20px rgba(255, 183, 197, 0.4)',
    touchAction: 'manipulation', // Prevent double-tap zoom
  };

  const floatingEmojis = ['☁️', '✨', '🤍', '🧸'];

  return (
    <div style={containerStyle}>
      {/* Floating Background Elements - Hide some on mobile */}
      {floatingEmojis.map((emoji, index) => (
        <motion.div
          key={index}
          style={{
            position: 'fixed',
            fontSize: responsive('24px', '28px', '32px'),
            opacity: isMobile ? 0.3 : 0.4,
            pointerEvents: 'none',
            left: `${15 + index * 25}%`,
            top: `${20 + (index % 2) * 50}%`,
            display: isMobile && index > 1 ? 'none' : 'block', // Show fewer on mobile
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.5
          }}
        >
          {emoji}
        </motion.div>
      ))}

      <motion.div
        style={cardStyle}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Floating Character */}
        <motion.div
          style={logoStyle}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          🧸
        </motion.div>

        <motion.h1
          style={titleStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Harimu
        </motion.h1>

        <motion.p
          style={subtitleStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Teman virtual yang selalu ada untukmu ☁️
          {!isMobile && <br />}
          {isMobile ? ' ' : ''}Di sini, kamu aman untuk jadi dirimu sendiri.
        </motion.p>

        <form onSubmit={handleSubmit}>
          <motion.div
            style={inputContainerStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <input
              type="text"
              placeholder="Siapa namamu? ✨"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              style={inputStyle}
              maxLength={20}
              autoComplete="name"
              autoCapitalize="words"
            />
          </motion.div>

          <motion.button
            type="submit"
            style={buttonStyle}
            disabled={!name.trim()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={name.trim() ? { scale: 1.02, boxShadow: '0 6px 25px rgba(255, 183, 197, 0.5)' } : {}}
            whileTap={name.trim() ? { scale: 0.98 } : {}}
          >
            Mulai Ngobrol 🤍
          </motion.button>
        </form>

        <motion.p
          style={{ 
            marginTop: responsive('20px', '22px', '24px'), 
            fontSize: responsive('12px', '12px', '13px'), 
            color: '#A0A0A0',
            lineHeight: '1.5'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Semua percakapan bersifat privat dan
          {!isMobile && <br />}
          {isMobile ? ' ' : ''}tidak disimpan di mana pun 🔒
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LandingView;
