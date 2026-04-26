# Finance 101

An interactive 3D carousel presenting **John Bogle's 10 Rules of Investing**, built with React + Vite. Deployable on Vercel in one click.

## Features

- 3D rotating carousel with smooth wrap-around (no 300° snap on 10 → 1)
- Auto-advances on a randomised 3–4 second interval
- Navigate via arrow buttons, keyboard ← →, drag/swipe, or dot indicators
- Responsive — adjacent cards peek in from the sides on mobile
- Light / dark theme toggle

## Stack

- React 18 + Vite 5
- Plain CSS (no CSS-in-JS, no Tailwind)
- Zero runtime dependencies beyond React

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build      # production build → dist/
npm run preview    # serve the built dist/ locally
```

## Deploy to Vercel

Connect this repository in the Vercel dashboard. Vercel auto-detects Vite and runs `npm run build` with no extra configuration.

## Credits

- UI concept by [hoanghien0410](https://codepen.io/hoanghien0410/pen/MMPaqm) on CodePen
- Investing rules from *The Clash of the Cultures* by John C. Bogle
