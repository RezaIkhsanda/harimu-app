import React, { useRef, useEffect, useCallback, useImperativeHandle, forwardRef, memo } from 'react';
import './AudioPlayer.css';

const GlobalAudio = memo(forwardRef(({ isActive, isMuted, onToggleMute }, ref) => {
  const audioRef = useRef(null);
  const isPlayingRef = useRef(false);
  const currentVolumeRef = useRef(0.3);
  const fadeIntervalRef = useRef(null);

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    lowerVolume: () => {
      if (!audioRef.current) return;
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      
      const targetVolume = 0.1;
      const step = (currentVolumeRef.current - targetVolume) / 15;
      
      fadeIntervalRef.current = setInterval(() => {
        currentVolumeRef.current = Math.max(targetVolume, currentVolumeRef.current - step);
        if (audioRef.current) audioRef.current.volume = currentVolumeRef.current;
        if (currentVolumeRef.current <= targetVolume) clearInterval(fadeIntervalRef.current);
      }, 30);
    },
    restoreVolume: () => {
      if (!audioRef.current) return;
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      
      const targetVolume = 0.3;
      const step = (targetVolume - currentVolumeRef.current) / 15;
      
      fadeIntervalRef.current = setInterval(() => {
        currentVolumeRef.current = Math.min(targetVolume, currentVolumeRef.current + step);
        if (audioRef.current) audioRef.current.volume = currentVolumeRef.current;
        if (currentVolumeRef.current >= targetVolume) clearInterval(fadeIntervalRef.current);
      }, 30);
    },
    getAudioRef: () => audioRef.current
  }), []);

  // Play audio function
  const playAudio = useCallback(async () => {
    if (!audioRef.current || isPlayingRef.current) return;
    
    try {
      audioRef.current.volume = currentVolumeRef.current;
      await audioRef.current.play();
      isPlayingRef.current = true;
    } catch (err) {
      // Autoplay blocked, will retry on user interaction
      isPlayingRef.current = false;
    }
  }, []);

  // Handle activation
  useEffect(() => {
    if (isActive && audioRef.current) {
      playAudio();
    }
  }, [isActive, playAudio]);

  // Handle mute state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Global click listener to start audio (for autoplay policy)
  useEffect(() => {
    const handleInteraction = () => {
      if (isActive && !isPlayingRef.current) {
        playAudio();
      }
    };

    document.addEventListener('click', handleInteraction, { once: false, passive: true });
    document.addEventListener('touchstart', handleInteraction, { once: false, passive: true });

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, [isActive, playAudio]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, []);

  return (
    <>
      {/* Global Audio Element - Always mounted, never unmounts */}
      <audio
        ref={audioRef}
        loop
        playsInline
        preload="none"
        style={{ display: 'none' }}
      >
        <source src="/audio/dancing%20phone.mp3" type="audio/mpeg" />
      </audio>

      {/* Mute Button - Only visible when active */}
      {isActive && (
        <button
          className="audio-btn"
          onClick={onToggleMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {!isMuted && isPlayingRef.current && <span className="audio-btn__pulse" />}
          {isMuted ? '🔇' : '🎵'}
        </button>
      )}
    </>
  );
}));

GlobalAudio.displayName = 'GlobalAudio';

export default GlobalAudio;
