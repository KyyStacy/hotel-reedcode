import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';

export const usePlatform = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    // Check if running on native platform (Android/iOS)
    setIsNative(Capacitor.isNativePlatform());
    
    // Check if mobile screen size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return {
    isMobile,
    isNative,
    isWeb: !Capacitor.isNativePlatform(),
    platform: Capacitor.getPlatform()
  };
};
