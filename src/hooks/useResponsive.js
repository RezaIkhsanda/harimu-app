import { useState, useEffect } from 'react';

const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowSize.width < 480;
  const isTablet = windowSize.width >= 480 && windowSize.width < 1024;
  const isDesktop = windowSize.width >= 1024;

  // Responsive values helper
  const responsive = (mobile, tablet, desktop) => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };

  return {
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    responsive,
  };
};

export default useResponsive;
