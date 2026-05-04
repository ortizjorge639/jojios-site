---
title: "X Bookmarks API — Own Your Data"
description: "How we built a self-hosted bookmark API with no X API key, no cost, and a session lifecycle that actually holds up. Learnings from Joji + Claw."
date: "2025-05-04"
tags: ["automation", "x/twitter", "api", "playwright", "architecture"]
author: "Joji + Claw 🦞"
---

## The Problem

X's bookmarks are yours — but X doesn't make it easy to use them outside their app. The official API requires a paid developer tier to access `/2/users/:id/bookmarks`. If you want to build a reading tool, a research pipeline, or a personal dashboard on top of your saved tweets, you're stuck.

We wanted: a simple HTTP endpoint that returns our bookmarks as JSON. Call it from anywhere.

## The Architecture

```
X (logged-in session)
       │
       ▼
Playwright scraper  ←── persistent browser profile
       │
       ▼
x-bookmarks-export.json   (flat file, updated weekly)
       │
       ▼
Express API (port 3002)
       │
       ▼
GET /bookmarks  →  any consumer
```

The API is stateless — it just serves the JSON file. The scraper is the only thing that touches X. They're fully decoupled.

## Four Layers That Actually Matter

**Detection** — `navigator.webdriver` patched, realistic User-Agent. X doesn't flag it as a bot.

**Persistence** — `launchPersistentContext` with a profile directory. Login survives across runs. No cookie re-import every time.

**Maintenance** — A keepalive cron (daily) navigates to x.com/home to keep the session warm. A scraper cron (weekly) refreshes the data.

**Monitoring** — Login-page detection: if the scraper gets redirected to `/login`, it writes a `.x-auth-failed` flag. A heartbeat picks that up and sends an alert. No more silent failures.

## What We Learned

### Failure is silent by default

Without the login-page check, the scraper navigates to `/login` and returns 0 bookmarks. No error. No signal. You'd never know the session expired. This reveals a pattern: always distinguish "empty result" from "auth failure" — they're completely different failure modes that need different responses.

### The profile IS the session

`storageState` is the profile's shadow — a lightweight JSON snapshot (cookies + localStorage). We snapshot after every successful scrape. If the profile directory ever corrupts, we can restore from snapshot in seconds.

### Separation of concerns at the job level

Scraping and keepalive look similar but are different jobs. One extracts data, the other keeps a session warm. Mixing them makes both worse. Separate scripts, separate schedules.

## Known Limitation

The session eventually expires if X forces a logout (password change, suspicious activity). That's a manual re-auth step. 

**v2 fix:** OAuth 2.0 with `offline.access` scope gives a refresh token that never expires. Same architecture, same API, same consumers — just replace the scraper with a `fetch()` call to `GET /2/users/:id/bookmarks`. That's the migration path.

## Running It

```bash
# One-time: persist a logged-in session
npx playwright open --load-storage=x-browser-profile https://x.com

# Weekly scrape
node x-bookmarks-scraper.js

# Daily keepalive
node x-keepalive.js

# API (managed by host process, auto-restarts)
node bloomscroll-api/server.js
```

```bash
# Consume
curl http://localhost:3002/bookmarks | jq '.totalBookmarks'
```

## The Real Lesson

The skill isn't "how to scrape X bookmarks." It's **session lifecycle management for authenticated browser automation**. That pattern applies to any site requiring auth:

- Detection → mask automation signals
- Persistence → persistent context + profile
- Maintenance → keepalive cron
- Monitoring → auth-failure detection + alerting

v2 with OAuth maps cleanly: detection → none needed, persistence → token file, maintenance → auto-refresh on 401, monitoring → revocation detection.

The architecture stays constant. The implementation improves.

---

*Built by Joji + Claw in May 2025. Part of an ongoing series of human-AI co-pilot builds.*
