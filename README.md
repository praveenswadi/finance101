# Finance 101

An interactive collection of financial wisdom, built with React + Vite. Deployable on Vercel in one click.

## Features

- Animated hover-disclosure home screen — each wisdom expands on hover
- 3D rotating carousel for Bogle's 10 Rules of Investing
- Index Card page presenting Olen & Pollack's nine personal finance rules
- Auto-advances on a randomised 3–4 second interval (Bogle carousel)
- Navigate via arrow buttons, keyboard ← →, drag/swipe, or dot indicators
- Responsive — stacks vertically on mobile
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

- Home page hover-disclosure accordion by [jh3y](https://codepen.io/jh3y) on CodePen
- Bogle carousel UI concept by [hoanghien0410](https://codepen.io/hoanghien0410/pen/MMPaqm) on CodePen
- Investing rules from *The Clash of the Cultures* by John C. Bogle
- Personal finance rules from *The Index Card* by Helaine Olen & Harold Pollack
