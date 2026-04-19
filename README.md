# CrowdEase — Physical AI Digital Twin Platform

> **2026 Google Challenge Submission**
> A production-grade, agentic crowd-safety platform powered by Google Cloud, Firebase, and Gemini AI.

---

## Overview

CrowdEase is a real-time **Physical AI Digital Twin** for large-venue crowd management. It fuses live IoT sensor telemetry, Google Cloud services, and an agentic AI safety engine to monitor, predict, and proactively re-route crowd flow — preventing dangerous density surges before they occur.

---

## Architecture

```
src/
├── services/
│   └── googleServices.ts     ← Unified Google Cloud API layer
│       ├── Firebase Analytics  (trackEvent)
│       ├── BigQuery Streaming  (streamToBigQuery)
│       ├── Cloud Vision API    (scanWithVision)
│       └── Gemini 1.5-flash   (callGemini)
├── logic/
│   └── densityEngine.ts      ← Core crowd physics & rerouting AI
├── hooks/
│   └── useCrowdLogic.ts      ← Real-time simulation + GCP telemetry
├── components/
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   ├── SafetyAdvisor.tsx     ← Gemini AI safety advice
│   └── SafetyAgent.tsx       ← Autonomous agentic rerouting
└── pages/
    ├── Dashboard.tsx         ← Live heatmap, IoT Core badges
    ├── Analytics.tsx         ← BigQuery predictive analytics
    ├── TicketScanner.tsx     ← Cloud Vision API ticket validation
    ├── Navigation.tsx        ← Google Maps route sync
    ├── SafetySOS.tsx         ← Emergency dispatch
    ├── Queues.tsx            ← Smart wait-time management
    ├── Upgrades.tsx          ← Seat upgrade engine
    └── LostAndFound.tsx      ← Asset tracking
```

---

## Google Services Integration

| Service | How It's Used | File |
|---|---|---|
| **Firebase Analytics** | Tracks crowd surge events & session telemetry | `services/googleServices.ts`, `hooks/useCrowdLogic.ts` |
| **BigQuery Streaming** | Ingests per-tick crowd metrics into data warehouse | `services/googleServices.ts`, `hooks/useCrowdLogic.ts` |
| **Cloud Vision API** | Validates ticket barcodes via image analysis | `services/googleServices.ts`, `pages/TicketScanner.tsx` |
| **Gemini 1.5-flash** | Generates agentic safety advice in real-time | `services/googleServices.ts`, `components/SafetyAdvisor.tsx` |
| **Google Maps Platform** | Spatial venue navigation & crowd routing | `pages/Navigation.tsx` |
| **Cloud Functions** | BigQuery streaming endpoint + server-side logic | `firebase/functions/index.js` |
| **Firebase Hosting** | Production deployment with security headers | `firebase.json` |
| **Google Tag Manager** | Analytics telemetry pipeline (gtag.js) | `index.html` |

---

## Security Features

- **Content Security Policy (CSP)** — strict `default-src 'self'` with allowlisted Google domains
- **HSTS** — `max-age=31536000; includeSubDomains`
- **X-Frame-Options: DENY** — clickjacking prevention
- **X-XSS-Protection: 1; mode=block**
- **X-Content-Type-Options: nosniff**
- **CSRF token** meta tag on all pages
- **DOMPurify** — sanitizes all user inputs before AI prompt injection
- **Strict TypeScript** — `"strict": true` in tsconfig, zero `any` types

---

## Testing

```bash
npm run test          # Run all 70+ tests with coverage report
npm run lint          # ESLint strict mode — 0 errors
npm run build         # TypeScript + Vite production build
```

### Coverage Summary

| Module | Coverage |
|---|---|
| `densityEngine.ts` | **100%** statements / branches / functions |
| `googleServices.ts` | **100%** statements with mocked fetch |
| `useCrowdLogic.ts` | **95%** |
| Total test files | **17 files, 70+ tests** |

### Test Strategy

- **Unit tests** — Pure logic functions (`densityEngine`, `googleServices`)
- **Integration tests** — React component rendering & interaction (`Login`, `Dashboard`, `SafetyAdvisor`)
- **Hook tests** — Async timer simulation (`useCrowdLogic`)
- **Security tests** — XSS input sanitization paths (`SafetyAdvisor`)
- **Automated CI/CD** — GitHub Actions workflow (`.github/workflows/test.yml` + `deploy.yml`)

---

## Accessibility

- Semantic HTML5 layout: `<main>`, `<header>`, `<aside>`, `<section>`, `<nav>`
- All interactive icons have `aria-label` and `aria-hidden="true"` on decorative SVGs
- Keyboard-navigable route structure
- `prefers-reduced-motion` support via Framer Motion `MotionConfig`
- WCAG 2.1 AA colour contrast on all text elements

---

## Running Locally

```bash
npm install
npm run dev        # http://localhost:5173
```

Set environment variables (copy `.env.example` → `.env`):

```env
VITE_FIREBASE_API_KEY=...
VITE_GEMINI_API_KEY=...
VITE_VISION_API_KEY=...
VITE_MAPS_API_KEY=...
VITE_CF_ENDPOINT=...      # Firebase Cloud Function URL
```

> All Google Services fall back to high-fidelity simulation mode when keys are absent — the UI remains fully functional for local evaluation.

---

## Problem Statement Alignment

CrowdEase directly addresses the Google Challenge problem statement:

- **Physical AI** — The density engine models real-world crowd fluid dynamics
- **Digital Twin** — Live heatmap mirrors actual venue sensor state
- **Agentic Engine** — SafetyAgent autonomously triggers reroutes when thresholds are breached, without human intervention
- **Google Cloud** — 8 Google services integrated across every layer of the stack