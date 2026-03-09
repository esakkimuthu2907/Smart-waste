# LifeLine AI - Master Development Prompt

Use this prompt in Cursor/Bolt/Replit/Lovable/ChatGPT code mode:

```text
Build a simple, highly usable, emergency-first web app called “LifeLine AI” for ambulance drivers.

Goal:
Reduce ambulance travel time by combining nearest-hospital discovery, AI-assisted route selection, and emergency traffic signal alerting.

Critical UX Rule:
This app is used during emergencies, so keep interaction minimal: large buttons, one-screen workflow, no complex settings, and clear status labels.

Core Modes:
1) Normal Mode
- Basic navigation and hospital search.
- Show nearby hospitals with distance and ETA.

2) Emergency Mode
- One-tap activation.
- Voice input enabled for hands-free operation.
- Trigger green corridor alerts along the route.
- Show clear emergency status and countdown ETA.

Main Features:
- Google Maps integration (live map, traffic layer, route lines, rerouting).
- Voice command input (e.g., “Find nearest hospital in Ambattur”).
- AI/ML route scoring that prefers fastest route (not only shortest) using traffic, distance, and predicted congestion.
- Hospital recommendation based on distance + traffic + emergency capacity.
- Real-time hospital notification with ETA.
- Traffic signal alert simulation/real API integration for green corridor.
- Nearby vehicle push alerts (“Ambulance approaching, please give way”).

AI/ML:
- Include a lightweight prediction service (Python FastAPI + scikit-learn/TensorFlow).
- Input features: current traffic, historical trend, weather, time of day, incidents.
- Output: congestion score and route ranking.
- Provide fallback heuristic if model service is unavailable.

Architecture:
- Frontend: React + Tailwind.
- Backend: Node.js/Express API gateway.
- ML service: Python FastAPI.
- DB: Firebase or MongoDB.
- Integrations: Google Maps API, Web Speech API, Firebase Cloud Messaging.

UI Requirements:
- Clean, modern, dark theme.
- Big Emergency button (red), big Voice button, large hospital cards.
- One primary action per step.
- Mobile-first responsive design.
- Accessibility: clear contrast, readable labels, no tiny controls.

Pages:
- Driver Console (main app)
- Traffic Control Dashboard (active ambulance routes + signal state)
- Hospital View (incoming ambulance + ETA + patient pre-alert)

Deliverables:
- Working frontend code.
- Backend APIs with mock data.
- ML route scoring endpoint.
- Demo mode with simulated ambulance movement and signal transitions.
- README with setup steps and demo script for judges.

Demo Story:
1. Driver enables Emergency Mode.
2. Voice says: “Nearest hospital in Ambattur.”
3. App ranks hospitals and selects best route.
4. Green corridor alerts are triggered on upcoming signals.
5. Hospital receives ETA and prepares emergency team.
6. Dashboard shows live route + signal states.

Non-functional:
- Fast load, reliable fallback behavior, secure API auth, encrypted transport.
```
