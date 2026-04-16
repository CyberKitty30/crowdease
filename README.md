🏗️ Vertical
Smart Infrastructure & Crisis Management AI-driven navigation to prevent crowd crush and optimize flow in high-density venues.

🧠 Approach & Logic
CrowdEase uses Predictive Pressure Logic to manage human density dynamically.

Threshold Gates: When a zone hits 80% capacity, the system triggers an automatic reroute.

Intent Processing: Google Gemini translates natural language (e.g., "fastest exit") into safe, low-density coordinates.

Fluid Routing: It prioritizes system equilibrium over "shortest path" to prevent secondary bottlenecks.

⚡ How it Works
The solution leverages a high-performance Google Cloud stack optimized for the Antigravity challenge:

Antigravity Compliance: Ultra-lightweight React + Vite build (< 1 MB) using SVG-only assets and CDN-hosted dependencies.

Google Cloud Run: Provides instant, serverless scaling to handle 100k+ concurrent users during peak event surges.

Google Instances: High-performance Compute Engine nodes process live IoT sensor telemetry into actionable density data.

Google Maps Platform: Powers the geospatial geofencing and real-time user location tracking.

📝 Assumptions
IoT Feed: Real-time occupancy data is available via a secure JSON endpoint.

User Access: Location permissions are granted for proximity-based rerouting.

Network: Low-latency 5G or high-density Wi-Fi is available on-site.

📂 Structure
src/logic/densityEngine.ts: Core autonomous rerouting algorithm.

src/components/Assistant: Gemini-powered navigation interface.

public/assets: Minimalist SVG iconography.
