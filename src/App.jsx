import React, { useState, useRef, useCallback, lazy, Suspense, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingView from './components/LandingView.jsx';
import MoodGrid from './components/MoodGrid.jsx';
import ChatInterface from './components/ChatInterface.jsx';
import EndingAction from './components/EndingAction.jsx';
import AudioPlayer from './components/AudioPlayer.jsx';
import { moods } from './data/conversationTree';
import './App.css';

// Lazy load heavy components (only loaded when needed)
const BalloonPop = lazy(() => import('./components/BalloonPop.jsx'));
const HealingTreat = lazy(() => import('./components/HealingTreat.jsx'));

// Simple loading fallback
const LoadingFallback = () => (
  <div className="loading-fallback">
    <div className="loading-spinner">☁️</div>
  </div>
);

// Moods that trigger the BalloonPop stress relief
const negativeMoods = ['burnout', 'socialAnxiety', 'loneliness'];

// Optimized page variants - snappier transitions
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
  const [stressReliefType, setStressReliefType] = useState(null);
  const audioPlayerRef = useRef(null);

  // Memoize mood color calculation
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
    
    // Determine which stress relief to show
    const type = negativeMoods.includes(moodId) && Math.random() < 0.6 
      ? 'balloon' 
      : 'treat';
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
    audioPlayerRef.current?.restoreVolume();
    setUserName('');
    setSelectedMood(null);
    setStressReliefType(null);
    setCurrentView('landing');
    setAudioActive(false);
  }, []);

  const handleSecretReveal = useCallback(() => {
    audioPlayerRef.current?.lowerVolume();
  }, []);

  return (
    <div className="app">
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

      <AudioPlayer ref={audioPlayerRef} isActive={audioActive} />
    </div>
  );
}

export default App;
