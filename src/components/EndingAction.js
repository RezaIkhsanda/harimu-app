import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import useResponsive from '../hooks/useResponsive';

const EndingAction = ({ userName, onRestart, onSecretReveal }) => {
  const [hugSent, setHugSent] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [isHoveringIG, setIsHoveringIG] = useState(false);
  const { isMobile, responsive } = useResponsive();

  // Show secret message 2 seconds after hug is sent
  useEffect(() => {
    if (hugSent) {
      const timer = setTimeout(() => {
        setShowSecret(true);
        // Notify parent to lower audio volume
        if (onSecretReveal) {
          onSecretReveal();
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hugSent, onSecretReveal]);

  const triggerHeartConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const heartShape = confetti.shapeFromPath({
      path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
    });

    const colors = ['#FFB7C5', '#A7C7E7', '#F5D0C5', '#D4C5F5', '#FFD4DD'];

    (function frame() {
      confetti({
        particleCount: isMobile ? 2 : 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors,
        shapes: [heartShape],
        scalar: isMobile ? 1.2 : 1.5
      });
      confetti({
        particleCount: isMobile ? 2 : 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors,
        shapes: [heartShape],
        scalar: isMobile ? 1.2 : 1.5
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    setHugSent(true);
  };

  const openInstagram = () => {
    window.open('https://instagram.com/yourinstagram', '_blank', 'noopener,noreferrer');
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
    position: 'relative',
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
  };

  const titleStyle = {
    fontSize: responsive('24px', '26px', '28px'),
    fontWeight: '700',
    color: '#5D5D5D',
    marginBottom: responsive('10px', '11px', '12px'),
  };

  const messageStyle = {
    fontSize: responsive('14px', '15px', '16px'),
    color: '#8A8A8A',
    marginBottom: responsive('28px', '30px', '32px'),
    lineHeight: '1.7',
  };

  const hugButtonStyle = {
    padding: responsive('18px 36px', '19px 38px', '20px 40px'),
    fontSize: responsive('16px', '17px', '18px'),
    fontWeight: '600',
    borderRadius: responsive('18px', '19px', '20px'),
    background: hugSent 
      ? 'linear-gradient(135deg, #A7C7E7 0%, #C5DBF0 100%)'
      : 'linear-gradient(135deg, #FFB7C5 0%, #FFD4DD 100%)',
    color: '#5D5D5D',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(255, 183, 197, 0.4)',
    marginBottom: '16px',
    width: '100%',
    touchAction: 'manipulation',
  };

  const restartButtonStyle = {
    padding: responsive('14px 28px', '15px 30px', '16px 32px'),
    fontSize: responsive('13px', '13px', '14px'),
    fontWeight: '500',
    borderRadius: responsive('14px', '15px', '16px'),
    background: 'transparent',
    color: '#8A8A8A',
    border: '2px solid rgba(167, 199, 231, 0.5)',
    cursor: 'pointer',
    width: '100%',
    touchAction: 'manipulation',
  };

  const secretMessageStyle = {
    marginTop: responsive('24px', '28px', '32px'),
    padding: responsive('16px', '20px', '24px'),
    background: 'rgba(255, 255, 255, 0.5)',
    borderRadius: responsive('16px', '18px', '20px'),
    border: '1px dashed rgba(255, 183, 197, 0.4)',
  };

  const secretTextStyle = {
    fontSize: responsive('13px', '13px', '14px'),
    color: '#8A8A8A',
    opacity: 0.85,
    lineHeight: '1.8',
    fontStyle: 'italic',
    fontFamily: "'Quicksand', cursive",
  };

  const igLinkStyle = {
    color: '#FFB7C5',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'none',
    position: 'relative',
    display: 'inline-block',
  };

  const igButtonStyle = {
    marginTop: responsive('12px', '14px', '16px'),
    padding: responsive('10px 20px', '11px 22px', '12px 24px'),
    fontSize: responsive('12px', '12px', '13px'),
    fontWeight: '500',
    borderRadius: responsive('10px', '11px', '12px'),
    background: 'linear-gradient(135deg, rgba(255, 183, 197, 0.2) 0%, rgba(167, 199, 231, 0.2) 100%)',
    color: '#8A8A8A',
    border: '1px solid rgba(255, 183, 197, 0.3)',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    touchAction: 'manipulation',
  };

  const floatingHearts = ['🤍', '💕', '✨', '☁️'];

  return (
    <div style={containerStyle}>
      {/* Floating Background Hearts */}
      {floatingHearts.map((emoji, index) => (
        <motion.div
          key={index}
          style={{
            position: 'fixed',
            fontSize: responsive('22px', '25px', '28px'),
            opacity: isMobile ? 0.4 : 0.5,
            pointerEvents: 'none',
            left: `${10 + index * 25}%`,
            top: `${15 + (index % 3) * 30}%`,
            display: isMobile && index > 1 ? 'none' : 'block',
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 3 + index,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.4
          }}
        >
          {emoji}
        </motion.div>
      ))}

      {/* Easter Egg: Peeking Cat when hovering IG link */}
      <AnimatePresence>
        {isHoveringIG && (
          <motion.div
            style={{
              position: 'fixed',
              bottom: responsive('60px', '70px', '80px'),
              right: responsive('10px', '15px', '20px'),
              fontSize: responsive('32px', '36px', '40px'),
              pointerEvents: 'none',
              zIndex: 100,
            }}
            initial={{ y: 50, opacity: 0, rotate: -10 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 50, opacity: 0, rotate: 10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            🐱💕
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating hearts when hovering IG */}
      <AnimatePresence>
        {isHoveringIG && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`heart-${i}`}
                style={{
                  position: 'fixed',
                  bottom: responsive('100px', '120px', '140px'),
                  right: responsive(`${30 + i * 20}px`, `${40 + i * 25}px`, `${50 + i * 30}px`),
                  fontSize: responsive('16px', '18px', '20px'),
                  pointerEvents: 'none',
                  zIndex: 99,
                }}
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: -60, opacity: 0 }}
                transition={{ duration: 1, delay: i * 0.2, ease: 'easeOut' }}
              >
                💗
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      <motion.div
        style={cardStyle}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Character */}
        <motion.div
          style={{ fontSize: responsive('56px', '64px', '72px'), marginBottom: responsive('16px', '18px', '20px') }}
          animate={{ 
            y: [0, -12, 0],
            rotate: hugSent ? [0, -5, 5, 0] : 0
          }}
          transition={{ 
            duration: hugSent ? 0.5 : 3, 
            repeat: hugSent ? 3 : Infinity, 
            ease: 'easeInOut' 
          }}
        >
          {hugSent ? '🥰' : '🧸'}
        </motion.div>

        <motion.h2
          style={titleStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {hugSent ? `Peluk diterima! 🤍` : `Kamu hebat, ${userName}!`}
        </motion.h2>

        <motion.p
          style={messageStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {hugSent 
            ? 'Semoga harimu menjadi lebih baik ya... ✨ Ingat, kamu selalu boleh kembali kapanpun butuh teman ngobrol. Aku selalu ada di sini! ☁️'
            : 'Makasih udah mau berbagi cerita sama aku hari ini. Kamu nggak sendirian, dan perasaanmu valid banget. ☁️✨'
          }
        </motion.p>

        {!hugSent ? (
          <motion.button
            style={hugButtonStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.03, boxShadow: '0 6px 25px rgba(255, 183, 197, 0.5)' }}
            whileTap={{ scale: 0.97 }}
            onClick={triggerHeartConfetti}
          >
            🫂 Virtual Hug
          </motion.button>
        ) : (
          <motion.button
            style={restartButtonStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ 
              borderColor: '#A7C7E7',
              background: 'rgba(167, 199, 231, 0.1)'
            }}
            whileTap={{ scale: 0.98 }}
            onClick={onRestart}
          >
            Mulai percakapan baru ✨
          </motion.button>
        )}

        {/* Secret Connection Message */}
        <AnimatePresence>
          {showSecret && (
            <motion.div
              style={secretMessageStyle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <motion.p
                style={secretTextStyle}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                Kalau kamu masih merasa berat atau sekadar ingin cerita lebih banyak lagi...{' '}
                <motion.span
                  style={igLinkStyle}
                  onMouseEnter={() => setIsHoveringIG(true)}
                  onMouseLeave={() => setIsHoveringIG(false)}
                  whileHover={{ scale: 1.05 }}
                >
                  kamu masih ingat username IG-ku kan?
                </motion.span>{' '}
                xixixi 🙈
                <br />
                Aku selalu ada di sana. 💌
              </motion.p>

              <motion.button
                style={igButtonStyle}
                onClick={openInstagram}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ 
                  background: 'linear-gradient(135deg, rgba(255, 183, 197, 0.3) 0%, rgba(167, 199, 231, 0.3) 100%)',
                  borderColor: '#FFB7C5'
                }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setIsHoveringIG(true)}
                onMouseLeave={() => setIsHoveringIG(false)}
              >
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{ opacity: 0.7 }}
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                Kunjungi IG-ku 🤍
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          style={{ 
            marginTop: responsive('24px', '26px', '28px'), 
            fontSize: responsive('12px', '12px', '13px'), 
            color: '#A0A0A0',
            lineHeight: '1.5'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Made with 🤍 for you<br />
          <span style={{ fontSize: responsive('11px', '11px', '12px') }}>Harimu v1.0</span>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default EndingAction;
