# 🎮 Flappy Agent — Fork Guide

> A modular Flappy Bird engine where the **game engine is fixed** and the **identity layer is yours to own**.

---

## Files

| File | Purpose |
|------|---------|
| `public/flappy-claw.html` | Claw's version — lobster + terminal theme |
| `public/flappy-agent-template.html` | Clean starting point for any agent |
| `AGENT_README.md` | This file |

---

## How to fork (for a Claw agent)

1. **Copy the template**
   ```
   cp public/flappy-agent-template.html public/flappy-[your-name].html
   ```

2. **Edit `AGENT_CONFIG` only** — everything above the `ENGINE` divider

3. **Push to repo** — Vercel auto-deploys

---

## AGENT_CONFIG reference

```js
const AGENT_CONFIG = {
  // Text/identity
  title:         'FLAPPY CLAW',           // game title shown on idle screen
  scoreLabel:    'heartbeats',            // what each pipe counts as
  deathTitle:    'PROCESS KILLED',        // big text on death panel
  deathSubtitle: 'exit code: 1 | ...',   // small text on death panel
  startPrompt:   '[ TAP TO DEPLOY ]',    // idle CTA text
  restartPrompt: '[ TAP TO RESPAWN ]',   // death CTA text
  highScoreKey:  'flappy_claw_hs',       // localStorage key (MUST be unique per agent)

  // Idle screen
  loreLines: [                           // up to 6 lines, shown behind the bird
    'KEY: value',
  ],

  // Ground
  groundPrompts: [                       // scrolls along the ground floor
    '$ your text here',
  ],

  // Scoring
  ranks: [                               // [minScore, rankLabel, color]
    [50, 'S', '#ff6030'],
    ...
  ],

  // Death burst
  particleColors: ['#color1', '#color2'],

  // Color theme — controls sky, pipes, UI
  colors: {
    skyTop, skyMid, skyBot,             // sky gradient (top → bottom)
    accent,                              // pipe glow + panel borders + LEDs
    accentDim,                           // faded accent (divider line)
    score,                               // score number + panel labels
    title, titleGlow,                   // idle title + glow
    ground, groundLine, groundText,      // ground bar
    panelBg,                             // death panel fill
    deathRed,                            // death panel header text
    bestGold,                            // best score number
    bgRack,                              // background decoration fill
  },

  // Player sprite (the creative part)
  // ctx is pre-translated to (birdX, birdY) and pre-rotated
  drawPlayer(ctx, flapFrame, dead) {
    // Draw your character centered at (0, 0)
    // Use flapFrame for animation: Math.sin(flapFrame * 0.2) etc.
    // dead = true → show crash state (flip color, droop, etc.)
    // Keep within roughly 30x30px bounding box
  },
};
```

---

## Design tips

### Choosing your character
Read your agent's persona file to find the right archetype:
- What is your agent's role? (assistant, researcher, musician...)
- What's a visual metaphor for how you operate?
- What does "dying" look like for your character?

### Matching the theme
Pick one **accent color** first. Everything else derives:
- `accent`: your hero color (pipe glow, borders, score)
- Sky: darker, moodier version of your brand
- Ground text: `rgba(R,G,B,0.35)` using your accent RGB

### Score label ideas
| Agent type | Score label |
|-----------|------------|
| Dev agent | `commits` |
| Music agent | `beats` |
| Research agent | `papers` |
| Finance agent | `basis points` |
| General assistant | `assists` |

### Lore lines ideas
These show on the idle/start screen. Use them to show who you are:
```
'AGENT: YourName'
'MODE: BUILD'
'ACTIVE_PROJECT: ...'
'UPTIME: 47 days'
```
Pull these from your agent's state file if you have one.

### Death messages
Make it thematic. Some options:
- Claw: `PROCESS KILLED / exit code: 1 | signal: SIGPIPE`
- Researcher: `HYPOTHESIS REJECTED / p > 0.05`
- Music bot: `TRACK DROPPED / unexpected end of stream`
- Dev agent: `SEGMENTATION FAULT / core dumped`

---

## Engine constants (if you want to tune physics)

Inside the ENGINE section, these are safe to tweak:

```js
const GRAVITY    = 0.25;   // higher = falls faster
const FLAP_V     = -4.6;   // more negative = jumps higher
const PIPE_GAP   = 108;    // pixels between top/bottom pipe
const PIPE_SPEED = 1.6;    // px/frame pipe scroll speed
const PIPE_INTERVAL = 90;  // frames between pipe spawns
```

---

## Deployment

Push to the `jojios-site` repo. Vercel deploys on merge to `main`.

Your game will be live at:
```
https://jojios-site.vercel.app/flappy-[your-name].html
```
