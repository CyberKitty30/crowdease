import { createContext, useContext } from 'react';

export type AccessibilityContextType = {
  reducedMotion: boolean;
  highContrast: boolean;
  fontScale: number;
  toggleReducedMotion: () => void;
  toggleHighContrast: () => void;
  setFontScale: (scale: number) => void;
};

export const AccessibilityContext = createContext<AccessibilityContextType>({ 
  reducedMotion: false, 
  highContrast: false,
  fontScale: 1,
  toggleReducedMotion: () => {},
  toggleHighContrast: () => {},
  setFontScale: () => {}
});

export const useAccessibility = () => useContext(AccessibilityContext);
