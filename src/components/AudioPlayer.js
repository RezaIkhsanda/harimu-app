import React, { useState, useRef, useEffect, useCallback, useImperativeHandle, forwardRef, memo } from 'react';
import useResponsive from '../hooks/useResponsive';
import './AudioPlayer.css';

const AudioPlayer = memo(forwardRef(({ isActive }, ref) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const currentVolumeRef = useRef(0.3);
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);
  const { isMobile } = useResponsive();

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    lowerVolume: () => {
      if (!audioRef.current) return;
      
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      
      const targetVolume = 0.1;
      const step = (currentVolumeRef.current - targetVolume) / 15;
      
      fadeIntervalRef.current = setInterval(() => {
        currentVolumeRef.current -= step;
        if (currentVolumeRef.current <= targetVolume) {
          currentVolumeRef.current = targetVolume;
          clearInterval(fadeIntervalRef.current);
        }
        if (audioRef.current) {
          audioRef.current.volume = currentVolumeRef.current;
        }
      }, 30);
    },
    restoreVolume: () => {
      if (!audioRef.current) return;
      
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      
      const targetVolume = 0.3;
      const step = (targetVolume - currentVolumeRef.current) / 15;
      
      fadeIntervalRef.current = setInterval(() => {
        currentVolumeRef.current += step;
        if (currentVolumeRef.current >= targetVolume) {
          currentVolumeRef.current = targetVolume;
          clearInterval(fadeIntervalRef.current);
        }
        if (audioRef.current) {
          audioRef.current.volume = currentVolumeRef.current;
        }
      }, 30);
    }
  }), []);

  const playAudio = useCallback(async () => {
    if (!audioRef.current) return;
    try {
      audioRef.current.volume = currentVolumeRef.current;
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const initAudio = useCallback(() => {
    if (audioRef.current && !hasInteracted) {
      audioRef.current.load();
      setHasInteracted(true);
    }
  }, [hasInteracted]);

  useEffect(() => {
    if (isActive && audioRef.current) {
      playAudio();
    }
  }, [isActive, playAudio]);

  useEffect(() => {
    const handleFirstInteraction = () => {
      initAudio();
      if (isActive && !isPlaying) {
        playAudio();
      }
    };

    document.addEventListener('touchstart', handleFirstInteraction, { once: true, passive: true });
    document.addEventListener('click', handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('click', handleFirstInteraction);
    };
  }, [isActive, isPlaying, initAudio, playAudio]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      audioRef.current.muted = false;
      if (!isPlaying) playAudio();
    } else {
      audioRef.current.muted = true;
    }
    setIsMuted(prev => !prev);
  }, [isMuted, isPlaying, playAudio]);

  if (!isActive) return null;

  return (
    <>
      {/* Audio Element - preload="none" until needed */}
      <audio
        ref={audioRef}
        loop
        playsInline
        preload="none"
        style={{ display: 'none' }}
      >
        <source src="/audio/dancing%20phone.mp3" type="audio/mpeg" />
      </audio>

      {/* Mute Button with CSS animation instead of Framer Motion */}
      <button
        className={`audio-btn ${isMobile ? 'audio-btn--mobile' : ''}`}
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {!isMuted && isPlaying && <span className="audio-btn__pulse" />}
        {isMuted ? '🔇' : '🎵'}
      </button>
    </>
  );
}));

AudioPlayer.displayName = 'AudioPlayer';

export default AudioPlayer;
