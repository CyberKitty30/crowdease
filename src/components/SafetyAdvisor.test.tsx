import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SafetyAdvisor from './SafetyAdvisor';

describe('SafetyAdvisor Agent Component', () => {
  it('mounts UI securely missing API bypass or simulating AI responses', () => {
    render(
      <SafetyAdvisor 
        incidentType="Critical Med-Evac" 
        location="Ramp B" 
        description="Priority routing test string mapping." 
        isTriggered={true} 
      />
    );
    expect(screen.getByText('Gemini Safety Advisor')).toBeTruthy();
  });
  
  it('returns null safely prior to triggering events dynamically', () => {
    const { container } = render(
        <SafetyAdvisor 
          incidentType="None" 
          location="" 
          description="" 
          isTriggered={false} 
        />
    );
    expect(container.firstChild).toBeNull();
  })
});
