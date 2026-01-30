import React, { useState, useRef, useCallback, lazy, Suspense, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingView from './components/LandingView.jsx';
import MoodGrid from './components/MoodGrid.jsx';
import ChatInterface from './components/ChatInterface.jsx';
import EndingAction from './components/EndingAction.jsx';
import GlobalAudio from './components/GlobalAudio.jsx';
import { moods } from './data/conversationTree';
import './App.css';

// Lazy load heavy components
const BalloonPop = lazy(() => import('./components/BalloonPop.jsx'));
const HealingTreat = lazy(() => import('./components/HealingTreat.jsx'));

// Loading fallback
const LoadingFallback = () => (
  <div className="loading-fallback">
    <div className="loading-spinner">☁️</div>
  </div>
);

// Moods that trigger BalloonPop
const negativeMoods = ['burnout', 'socialAnxiety', 'loneliness'];

// Page transition config
const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};
const pageTransition = { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] };

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [userName, setUserName] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const [audioActive, setAudioActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [stressReliefType, setStressReliefType] = useState(null);
  const audioRef = useRef(null);

  // Memoize mood color
  const moodColor = useMemo(() => {
    if (!selectedMood) return '#FFB7C5';
    const mood = moods.find(m => m.id === selectedMood);
    return mood ? mood.color : '#FFB7C5';
  }, [selectedMood]);

  const handleStart = useCallback((name) => {
    setUserName(name);
    setCurrentView('mood');
    setAudioActive(true);
  }, []);

  const handleMoodSelect = useCallback((moodId) => {
    setSelectedMood(moodId);
    const type = negativeMoods.includes(moodId) && Math.random() < 0.6 ? 'balloon' : 'treat';
    setStressReliefType(type);
    setCurrentView('stressRelief');
  }, []);

  const handleStressReliefComplete = useCallback(() => {
    setCurrentView('chat');
  }, []);

  const handleChatComplete = useCallback(() => {
    setCurrentView('ending');
  }, []);

  const handleRestart = useCallback(() => {
    audioRef.current?.restoreVolume();
    setUserName('');
    setSelectedMood(null);
    setStressReliefType(null);
    setCurrentView('landing');
    setAudioActive(false);
    setIsMuted(false);
  }, []);

  const handleSecretReveal = useCallback(() => {
    audioRef.current?.lowerVolume();
  }, []);

  const handleToggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  return (
    <div className="app">
      {/* Global Audio - Always at top level, never unmounts during session */}
      <GlobalAudio 
        ref={audioRef}
        isActive={audioActive}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      <AnimatePresence mode="wait">
        {currentView === 'landing' && (
          <motion.div
            key="landing"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <LandingView onStart={handleStart} />
          </motion.div>
        )}

        {currentView === 'mood' && (
          <motion.div
            key="mood"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <MoodGrid 
              onSelectMood={handleMoodSelect} 
              userName={userName}
            />
          </motion.div>
        )}

        {currentView === 'stressRelief' && (
          <motion.div
            key="stressRelief"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <Suspense fallback={<LoadingFallback />}>
              {stressReliefType === 'balloon' ? (
                <BalloonPop 
                  userName={userName}
                  onComplete={handleStressReliefComplete}
                />
              ) : (
                <HealingTreat 
                  userName={userName}
                  onComplete={handleStressReliefComplete}
                />
              )}
            </Suspense>
          </motion.div>
        )}

        {currentView === 'chat' && (
          <motion.div
            key="chat"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <ChatInterface 
              mood={selectedMood}
              userName={userName}
              onComplete={handleChatComplete}
              moodColor={moodColor}
            />
          </motion.div>
        )}

        {currentView === 'ending' && (
          <motion.div
            key="ending"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <EndingAction 
              userName={userName}
              onRestart={handleRestart}
              onSecretReveal={handleSecretReveal}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
