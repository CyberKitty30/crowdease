import { useState, type ReactNode, useEffect } from 'react';
import { AccessibilityContext } from './AccessibilityTypes';

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontScale, setFontScale] = useState(1);

  const toggleReducedMotion = () => setReducedMotion(p => !p);
  const toggleHighContrast = () => setHighContrast(p => !p);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', fontScale.toString());
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [fontScale, highContrast]);

  return (
    <AccessibilityContext.Provider value={{ 
      reducedMotion, 
      highContrast, 
      fontScale, 
      toggleReducedMotion, 
      toggleHighContrast, 
      setFontScale 
    }}>
      <div style={{ fontSize: `${fontScale * 100}%` }} className={highContrast ? 'high-contrast' : ''}>
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
}
