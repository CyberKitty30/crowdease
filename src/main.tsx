import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './firebase'
import App from './App.tsx'

/**
 * CrowdEase Digital Twin - Strict Security Architecture
 * 
 * Security Measures Implemented:
 * 1. React.StrictMode for early bug detection and side-effect checking.
 * 2. Strict Content Security Policy (CSP) in index.html.
 * 3. Environment variable isolation for sensitive API Keys (Google Maps, Gemini).
 * 4. Input Sanitization via DOMPurify in all AI-linked components.
 */

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

