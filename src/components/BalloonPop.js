import React, { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import useResponsive from '../hooks/useResponsive';

// Memoize heart shape - created once
const heartPath = 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';
const confettiColors = ['#FFB7C5', '#A7C7E7', '#F5D0C5', '#D4C5F5'];

const stressLabels = [
  { id: 1, text: 'Overthinking', color: '#FFB7C5' },
  { id: 2, text: 'Capek', color: '#A7C7E7' },
  { id: 3, text: 'Deadline', color: '#F5D0C5' },
  { id: 4, text: 'Bad Vibes', color: '#D4C5F5' },
  { id: 5, text: 'Sedih', color: '#C5E8D4' },
  { id: 6, text: 'Berisik', color: '#F5E6C5' },
];

const BalloonPop = ({ userName, onComplete }) => {
  const [balloons, setBalloons] = useState([]);
  const [showIntro, setShowIntro] = useState(true);
  const [allPopped, setAllPopped] = useState(false);
  const [poppedCount, setPoppedCount] = useState(0);
  const { responsive } = useResponsive();

  // Initialize balloons with random positions
  useEffect(() => {
    const initialBalloons = stressLabels.map((label, index) => ({
      ...label,
      x: 15 + Math.random() * 70, // percentage
      y: 20 + Math.random() * 50,
      delay: index * 0.2,
      isPopped: false,
    }));
    setBalloons(initialBalloons);

    // Hide intro after 2 seconds
    const timer = setTimeout(() => setShowIntro(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Create pop sound
  const playPopSound = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
      // Audio not supported
    }
  }, []);

  // Pop balloon - optimized confetti
  const popBalloon = useCallback((id) => {
    playPopSound();

    // Lighter confetti burst
    const heartShape = confetti.shapeFromPath({ path: heartPath });
    confetti({
      particleCount: 8,
      spread: 45,
      origin: { y: 0.5 },
      colors: confettiColors,
      shapes: [heartShape],
      scalar: 0.8,
      disableForReducedMotion: true,
    });

    setBalloons(prev => prev.map(b => 
      b.id === id ? { ...b, isPopped: true } : b
    ));
    
    setPoppedCount(prev => {
      const newCount = prev + 1;
      if (newCount >= stressLabels.length) {
        setTimeout(() => setAllPopped(true), 500);
      }
      return newCount;
    });
  }, [playPopSound]);

  const containerStyle = {
    minHeight: 'calc(100vh - env(safe-area-inset-bottom, 0px))',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: responsive('16px', '20px', '24px'),
    background: 'radial-gradient(circle at 50% 30%, #FFF5F7 0%, #F0F4FF 100%)',
    position: 'relative',
    overflow: 'hidden',
  };

  const introCardStyle = {
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: responsive('24px', '28px', '32px'),
    padding: responsive('32px 24px', '40px 32px', '48px 40px'),
    textAlign: 'center',
    maxWidth: responsive('100%', '400px', '420px'),
    width: '100%',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    zIndex: 10,
  };

  const balloonStyle = (balloon) => ({
    position: 'absolute',
    left: `${balloon.x}%`,
    top: `${balloon.y}%`,
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',
    zIndex: 5,
  });

  const balloonInnerStyle = (color) => ({
    width: responsive('80px', '90px', '100px'),
    height: responsive('100px', '112px', '125px'),
    background: `linear-gradient(135deg, ${color} 0%, ${color}90 50%, ${color}70 100%)`,
    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 8px 25px ${color}60, inset -10px -10px 20px rgba(255,255,255,0.4)`,
    position: 'relative',
  });

  const balloonStringStyle = {
    position: 'absolute',
    bottom: '-20px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '2px',
    height: '25px',
    background: 'linear-gradient(to bottom, #D0D0D0, #E8E8E8)',
    borderRadius: '2px',
  };

  const labelStyle = {
    fontSize: responsive('10px', '11px', '12px'),
    fontWeight: '600',
    color: '#5D5D5D',
    textAlign: 'center',
    padding: '4px 8px',
    textShadow: '0 1px 2px rgba(255,255,255,0.8)',
  };

  const progressStyle = {
    position: 'fixed',
    top: responsive('16px', '20px', '24px'),
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    padding: responsive('10px 20px', '12px 24px', '14px 28px'),
    borderRadius: '20px',
    fontSize: responsive('13px', '14px', '15px'),
    color: '#5D5D5D',
    fontWeight: '600',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    zIndex: 20,
  };

  const doneCardStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: responsive('24px', '28px', '32px'),
    padding: responsive('32px 24px', '40px 32px', '48px 40px'),
    textAlign: 'center',
    maxWidth: responsive('100%', '400px', '420px'),
    width: '100%',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  };

  const continueButtonStyle = {
    marginTop: responsive('20px', '24px', '28px'),
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

  return (
    <div style={containerStyle}>
      {/* Intro Screen */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            style={introCardStyle}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              style={{ fontSize: responsive('48px', '56px', '64px'), marginBottom: '16px' }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🎈
            </motion.div>
            <h2 style={{ 
              fontSize: responsive('20px', '22px', '24px'), 
              color: '#5D5D5D', 
              marginBottom: '12px',
              fontWeight: '600'
            }}>
              {userName}, sebelum kita lanjut...
            </h2>
            <p style={{ 
              fontSize: responsive('14px', '15px', '16px'), 
              color: '#8A8A8A', 
              lineHeight: '1.6' 
            }}>
              Yuk pecahkan balon-balon emosi negatif ini dulu! 🎯
              <br />
              <span style={{ fontSize: responsive('12px', '13px', '13px'), opacity: 0.8 }}>
                Tap setiap balon untuk melepaskannya...
              </span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Counter */}
      {!showIntro && !allPopped && (
        <motion.div
          style={progressStyle}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🎈 {poppedCount} / {stressLabels.length} dipecahkan
        </motion.div>
      )}

      {/* Balloons */}
      {!showIntro && !allPopped && (
        <AnimatePresence>
          {balloons.filter(b => !b.isPopped).map((balloon) => (
            <motion.div
              key={balloon.id}
              style={balloonStyle(balloon)}
              initial={{ opacity: 0, scale: 0, y: 50 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: [0, -15, 0, -10, 0],
                x: [0, 5, -5, 3, 0],
              }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{
                opacity: { duration: 0.3, delay: balloon.delay },
                scale: { duration: 0.4, delay: balloon.delay },
                y: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' },
                x: { duration: 4 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' },
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.3 }}
              onClick={() => popBalloon(balloon.id)}
            >
              <motion.div style={balloonInnerStyle(balloon.color)}>
                <span style={labelStyle}>{balloon.text}</span>
                <div style={balloonStringStyle} />
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}

      {/* Completion Screen */}
      <AnimatePresence>
        {allPopped && (
          <motion.div
            style={doneCardStyle}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div
              style={{ fontSize: responsive('56px', '64px', '72px'), marginBottom: '20px' }}
              animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 0.8, repeat: 2 }}
            >
              🎉
            </motion.div>
            <h2 style={{ 
              fontSize: responsive('22px', '24px', '26px'), 
              color: '#5D5D5D', 
              marginBottom: '12px',
              fontWeight: '700'
            }}>
              Lihat? Semuanya sudah pecah! ✨
            </h2>
            <p style={{ 
              fontSize: responsive('14px', '15px', '16px'), 
              color: '#8A8A8A', 
              lineHeight: '1.7' 
            }}>
              Sekarang tarik napas dalam-dalam ya...
              <br />
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Hirup... tahan... hembuskan... ☁️
              </motion.span>
            </p>
            <motion.button
              style={continueButtonStyle}
              onClick={onComplete}
              whileHover={{ scale: 1.03, boxShadow: '0 6px 25px rgba(255, 183, 197, 0.5)' }}
              whileTap={{ scale: 0.97 }}
            >
              Lanjut, aku siap 🤍
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(BalloonPop);
