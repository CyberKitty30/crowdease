# 🏟️ CrowdEase: Physical AI Digital Twin
**Optimized for the 2026 Google Challenge | Technical Merit & Accessibility Excellence**

CrowdEase is a production-ready **Digital Twin Assistant** that transforms static venue data into a dynamic, agentic ecosystem. It leverages fluid crowd dynamics and predictive logic to ensure ultra-safe, high-efficiency navigation in high-density environments.

![CrowdEase Dashboard](https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop)

---

## 🧠 Core Agentic Intelligence

### 1. State-Propagation Engine
Unlike static maps, CrowdEase utilizes a **State-Propagation Engine**. Fluctuations in `Zone_A` (Entrance) trigger delayed, fluid ripples in `Zone_B` (Food Court), simulating real-world physics and predicting bottlenecks before they happen.

### 2. Agentic Safety Assistant
Managed by a glassmorphic Agent component, the system doesn't just display alerts—it proposes **Action Plans**.
- **Ghost Routes**: Prescriptive rerouting that saves time and balances load.
- **Dynamic Deflection**: Autonomously managing inbound traffic via digital signage simulation.

### 3. Interactive Seat Upgrades
A cinematic, visual seat-map allowing users to claim available suites in real-time, with full transaction physics and coordinate persistence.

---

## ♿ 2026 Accessibility Mandate
CrowdEase is architected for April 2026 ADA Title II and WCAG 2.1 Level AA compliance.

- **Global Reduced Motion**: A centralized `AccessibilityContext` allows users to toggle off all animations across the entire platform.
- **Screen Reader Optimization**: Every live element (Heatmaps, Efficiency Gauges, AI Agent) uses `aria-live` and programmatic labeling for parity in experience.

---

## ⚡ Technical Stack (GCP Optimized)

- **Frontend**: React + Vite (Ultra-lightweight, < 1 MB bundle).
- **Styling**: Tailwind CSS V4 + Vanilla CSS Hybrid.
- **Animations**: Framer Motion (Optimized for reduced-motion contexts).
- **Icons**: Lucide React.
- **Deployment**: 
  - **Google Cloud Run**: Managed serverless containerization.
  - **Cloud Build**: Native GCP CI/CD integration.

---

## 📂 Deployment & Orchestration

The repository is configured for immediate cloud deployment.

### Containerization
The `dockerfile` is optimized with `NODE_ENV=production` and dynamic `$PORT` exposure for Google Cloud Run.

### GitHub / Cloud Run Sync
I have provided a deployment orchestrator in the `scripts/` directory:
```powershell
# Bypasses restricted execution policy to run the orchestrator
powershell -ExecutionPolicy Bypass -File .\scripts\deploy.ps1
```

### Manual Cloud Build
```bash
gcloud builds submit --config cloudbuild.yaml
```

---

## 🛠️ Development Setup

1. **Install Dependencies**: `npm install`
2. **Launch Dev Server**: `npm run dev`
3. **Production Build**: `npm run build`

---

> [!IMPORTANT]
> This project is designed for the **Antigravity Challenge**. It prioritizes extreme performance, visual excellence, and inclusive design.