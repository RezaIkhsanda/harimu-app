import React, { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import useResponsive from '../hooks/useResponsive';

const treats = [
  { id: 'cookie', emoji: '🍪', name: 'Cookie' },
  { id: 'milk', emoji: '🥛', name: 'Susu' },
  { id: 'candy', emoji: '🍭', name: 'Permen' },
];

// Memoized values
const heartPath = 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';
const confettiColors = ['#FFB7C5', '#A7C7E7', '#F5D0C5', '#FFD4DD'];

const HealingTreat = ({ userName, onComplete }) => {
  const [selectedTreat, setSelectedTreat] = useState(null);
  const [characterState, setCharacterState] = useState('waiting');
  const [showContinue, setShowContinue] = useState(false);
  const { responsive } = useResponsive();

  const giveTreat = useCallback((treat) => {
    setSelectedTreat(treat);
    setCharacterState('happy');

    // Optimized confetti - single burst
    const heartShape = confetti.shapeFromPath({ path: heartPath });
    
    setTimeout(() => {
      confetti({
        particleCount: 15,
        spread: 60,
        origin: { x: 0.5, y: 0.4 },
        colors: confettiColors,
        shapes: [heartShape],
        scalar: 1,
        disableForReducedMotion: true,
      });
    }, 200);

    // Play eating sound
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.15);
    } catch (e) {
      // Audio not supported
    }

    // Show continue faster
    setTimeout(() => {
      setCharacterState('done');
      setShowContinue(true);
    }, 1500);
  }, []);

  const containerStyle = {
    minHeight: 'calc(100vh - env(safe-area-inset-bottom, 0px))',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: responsive('16px', '20px', '24px'),
    background: 'radial-gradient(circle at 50% 30%, #FFF5F7 0%, #F0F4FF 100%)',
    overflow: 'hidden',
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: responsive('24px', '28px', '32px'),
    padding: responsive('32px 24px', '40px 32px', '48px 40px'),
    textAlign: 'center',
    maxWidth: responsive('100%', '420px', '450px'),
    width: '100%',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  };

  const characterContainerStyle = {
    position: 'relative',
    marginBottom: responsive('20px', '24px', '28px'),
  };

  const treatsContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: responsive('16px', '20px', '24px'),
    marginTop: responsive('24px', '28px', '32px'),
  };

  const treatButtonStyle = (isSelected) => ({
    width: responsive('70px', '80px', '90px'),
    height: responsive('70px', '80px', '90px'),
    borderRadius: '50%',
    background: isSelected 
      ? 'linear-gradient(135deg, #FFB7C5 0%, #FFD4DD 100%)'
      : 'rgba(255, 255, 255, 0.9)',
    border: isSelected 
      ? '3px solid #FFB7C5'
      : '2px solid rgba(255, 183, 197, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: selectedTreat ? 'default' : 'pointer',
    fontSize: responsive('28px', '32px', '36px'),
    boxShadow: isSelected 
      ? '0 8px 25px rgba(255, 183, 197, 0.5)'
      : '0 4px 15px rgba(0, 0, 0, 0.05)',
    touchAction: 'manipulation',
    opacity: selectedTreat && !isSelected ? 0.5 : 1,
  });

  const treatLabelStyle = {
    fontSize: responsive('10px', '10px', '11px'),
    color: '#8A8A8A',
    marginTop: '4px',
    fontWeight: '500',
  };

  const continueButtonStyle = {
    marginTop: responsive('24px', '28px', '32px'),
    padding: responsive('16px 32px', '17px 36px', '18px 40px'),
    fontSize: responsive('15px', '15px', '16px'),
    fontWeight: '600',
    borderRadius: responsive('14px', '15px', '16px'),
    background: 'linear-gradient(135deg, #FFB7C5 0%, #A7C7E7 100%)',
    color: '#5D5D5D',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(255, 183, 197, 0.4)',
    touchAction: 'manipulation',
  };

  // Floating hearts around character when happy
  const floatingHearts = ['💕', '💗', '🤍', '💖', '✨'];

  return (
    <div style={containerStyle}>
      <motion.div
        style={cardStyle}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Character */}
        <div style={characterContainerStyle}>
          {/* Floating hearts when happy */}
          <AnimatePresence>
            {characterState === 'happy' && floatingHearts.map((heart, index) => (
              <motion.div
                key={index}
                style={{
                  position: 'absolute',
                  fontSize: responsive('16px', '18px', '20px'),
                  left: `${30 + index * 10}%`,
                  top: '20%',
                  pointerEvents: 'none',
                }}
                initial={{ y: 0, opacity: 1, scale: 0 }}
                animate={{ 
                  y: -60, 
                  opacity: [0, 1, 1, 0], 
                  scale: [0, 1.2, 1, 0.8],
                  x: (index % 2 === 0 ? -1 : 1) * (10 + index * 5),
                }}
                transition={{ 
                  duration: 1.5, 
                  delay: index * 0.15,
                  ease: 'easeOut'
                }}
              >
                {heart}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* The Character */}
          <motion.div
            style={{ fontSize: responsive('72px', '84px', '96px') }}
            animate={
              characterState === 'waiting' 
                ? { y: [0, -5, 0], rotate: [0, -3, 3, 0] }
                : characterState === 'happy'
                ? { y: [0, -20, 0, -15, 0], scale: [1, 1.2, 1, 1.15, 1], rotate: [0, -10, 10, -5, 0] }
                : { y: [0, -5, 0] }
            }
            transition={
              characterState === 'happy'
                ? { duration: 1.2, ease: 'easeOut' }
                : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            {characterState === 'waiting' ? '🧸' : characterState === 'happy' ? '🥰' : '😊'}
          </motion.div>

          {/* Selected treat floating to character */}
          <AnimatePresence>
            {selectedTreat && characterState === 'happy' && (
              <motion.div
                style={{
                  position: 'absolute',
                  fontSize: responsive('24px', '28px', '32px'),
                  left: '50%',
                  bottom: '30%',
                }}
                initial={{ y: 50, x: '-50%', opacity: 1, scale: 1 }}
                animate={{ y: -20, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                {selectedTreat.emoji}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {characterState === 'waiting' && (
            <>
              <h2 style={{ 
                fontSize: responsive('18px', '20px', '22px'), 
                color: '#5D5D5D', 
                marginBottom: '12px',
                fontWeight: '600',
                lineHeight: '1.5'
              }}>
                {userName}, sebelum aku bicara...
              </h2>
              <p style={{ 
                fontSize: responsive('14px', '15px', '16px'), 
                color: '#8A8A8A', 
                lineHeight: '1.6' 
              }}>
                Bolehkah aku minta satu camilan? 🥺
                <br />
                Aku ingin menemanimu sambil ngemil!
              </p>
            </>
          )}

          {characterState === 'happy' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h2 style={{ 
                fontSize: responsive('20px', '22px', '24px'), 
                color: '#5D5D5D', 
                marginBottom: '8px',
                fontWeight: '700'
              }}>
                Nyam! Enak sekali! 😋
              </h2>
              <p style={{ 
                fontSize: responsive('14px', '15px', '16px'), 
                color: '#8A8A8A', 
                lineHeight: '1.6' 
              }}>
                Makasih ya, kamu baik banget! 💕
              </p>
            </motion.div>
          )}

          {characterState === 'done' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 style={{ 
                fontSize: responsive('20px', '22px', '24px'), 
                color: '#5D5D5D', 
                marginBottom: '8px',
                fontWeight: '700'
              }}>
                Sekarang, dengerin aku ya... 🤍
              </h2>
              <p style={{ 
                fontSize: responsive('14px', '15px', '16px'), 
                color: '#8A8A8A', 
                lineHeight: '1.6' 
              }}>
                Aku mau cerita sesuatu yang penting untukmu ✨
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Treats */}
        {characterState === 'waiting' && (
          <motion.div
            style={treatsContainerStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {treats.map((treat, index) => (
              <motion.button
                key={treat.id}
                style={treatButtonStyle(selectedTreat?.id === treat.id)}
                onClick={() => !selectedTreat && giveTreat(treat)}
                disabled={!!selectedTreat}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + index * 0.08 }}
                whileHover={!selectedTreat ? { scale: 1.1, y: -5 } : {}}
                whileTap={!selectedTreat ? { scale: 0.95 } : {}}
              >
                <span>{treat.emoji}</span>
                <span style={treatLabelStyle}>{treat.name}</span>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Continue Button */}
        <AnimatePresence>
          {showContinue && (
            <motion.button
              style={continueButtonStyle}
              onClick={onComplete}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03, boxShadow: '0 6px 25px rgba(255, 183, 197, 0.5)' }}
              whileTap={{ scale: 0.97 }}
            >
              Aku siap mendengar 🤍
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default memo(HealingTreat);
