# LifeLine AI (Improved Website Prototype)

LifeLine AI is an emergency-first ambulance navigation demo website for hackathon presentation.

## What this version adds

- Cleaner single-page website with a stronger visual identity.
- Driver Console with large controls and minimal steps.
- Smart hospital ranking panel with quick selection.
- Emergency alerts panel for traffic-signal and vehicle notifications.
- Mini control dashboard metrics + live event timeline for judges.
- Voice-fill support (browser dependent) and Google Maps integration hook.

## Run locally

```bash
python3 -m http.server 8000
```

Open `http://127.0.0.1:8000`.

## Files

- `index.html` - complete website layout
- `styles.css` - responsive emergency-friendly UI
- `app.js` - interaction logic and smart demo simulation
- `DEVELOPMENT_PROMPT.md` - production-grade build prompt (AI + maps + backend)
