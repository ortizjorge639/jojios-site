# Flappy Claw v2 — Design Document

> "A game personalized to you and your Claw — not a minigame, a living avatar mirror."

---

## Research Synthesis

### What Makes Balatro Addictive

1. **Joker Synergy System** — Passive modifiers (Jokers) stack and interact. No two runs feel the same because 3–5 Jokers create unexpected combinations. A Joker that multiplies suit bonuses becomes wild when combined with a Joker that converts suits.
2. **Escalating Score Economy** — Chips × Mult means small improvements compound exponentially. You can be 10× stronger next run with the right combo.
3. **Boss Blinds = High-Stakes Modifiers** — Each round ends with a "this changes the rules" moment. Forces adaptation.
4. **One-More-Run** — Earned via: surprise synergies discovered mid-run, the shop with "I can fix this" energy, and run seeds making each run feel like a solvable puzzle.
5. **Skip Economy** — Skipping a round rewards tags. Creates meaningful trade-offs, not just difficulty.

### What Makes Hades Addictive

1. **Boon Selection Feel** — Choosing between 3 deity-themed upgrades feels like building an identity for the run, not just clicking +damage.
2. **Darkness Currency / Failure Rewards** — Dying earns permanent currency. Death stops being punishment; it becomes investment. "I died at room 8 but now I can buy the Mirror upgrade."
3. **Heat System (Pact of Punishment)** — Optional difficulty conditions stacked voluntarily for bonus rewards. Mastery is demonstrated, not just accumulated.
4. **Narrative Integration** — Every death triggers new dialogue. The world reacts to your choices and run count. Characters remember your previous runs.
5. **Keepsake System** — One equipped item that grants themed starting bonus tied to a character.

---

## Mapping to Flappy Claw

| Inspiration | Flappy Claw Equivalent | Design Logic |
|---|---|---|
| Balatro Jokers | **RELICS** — passive run modifiers (max 3 slots) | Persistent effects that interact with other cards/effects |
| Balatro Boss Blind | **WORLD OMEN** — run modifier revealed at start | Makes each run feel like a different challenge |
| Balatro Score Multiplier | **Bit Multiplier Stacking** — relics/combos chain | Matches vibe of exponential score satisfaction |
| Hades Darkness Currency | **SHARDS** — earned on death, permanent tree | Reframes death as progress, not failure |
| Hades Boon Themes | **Relic Personalities** — each has flavor + glow color | Emotional attachment to your build |
| Hades Heat System | **CURSED MODE** — voluntary hard run for bonus shards | Mastery demonstration, not gatekeeping |
| Hades Narrative | **CLAW VOICE** — Claw personality lines at key moments | Personalization, world feels alive |
| Hades Keepsake | **STARTING RELIC** — pick 1 relic before each run | Pre-run identity choice |

---

## Core Philosophy

Flappy Claw v2 is **"a roguelite that lives in your pocket"** — quick sessions that feel meaningfully different, with a permanent layer that grows over time. The bird is still Claw; the runs are short; but every death matters, every run has a story, and the more you play the more the game becomes yours.

### Three Loops

1. **Micro Loop** (seconds): Flap → dodge → combo → bits
2. **Meso Loop** (run): Omen → relic build → pit stops → run narrative
3. **Macro Loop** (sessions): Shards → Trait Forge → new capabilities → different meta builds

---

## New Systems

### 1. RELICS (Joker Equivalent)
Persistent passive modifiers active for the full run. Up to 3 relic slots (expandable via Trait Forge).

**At run start:** Pick 1 relic from 3 random choices.  
**At pit stops:** 1/3 chance one of the 3 choices is a relic (instead of a card).

#### Relic Pool
| ID | Name | Effect |
|---|---|---|
| `coin_press` | COIN PRESS | Each pipe = +2 BITS (base ×2) |
| `lucky_wing` | LUCKY WING | 25% chance any pipe = triple bits |
| `iron_feather` | IRON FEATHER | Gravity −20%, gap −10% |
| `hot_rod` | HOT ROD | Speed +15%, bits +50% |
| `ghost_mantle` | GHOST MANTLE | Start each pit stop with 1 free ghost charge |
| `turbo_heart` | TURBO HEART | Flap velocity +25% always |
| `bit_magnet` | BIT MAGNET | Combo streak threshold −2 (easier combos) |
| `death_wish` | DEATH WISH | Start with 1 life only; bits ×4 |
| `shield_cloak` | SHIELD CLOAK | Auto-shield on respawn |
| `relic_echo` | ECHO LENS | Duplicate the effect of the last card used |

### 2. WORLD OMENS (Boss Blind Equivalent)
Each run rolls a random "omen" — a world condition that changes mechanics for the whole run. Revealed dramatically on a screen before play.

| ID | Name | Effect | Visual |
|---|---|---|---|
| `heavy` | HEAVY SKY | Gravity +35%, gap +20% | Darker sky, slower stars |
| `golden` | GOLDEN FEVER | All bits ×2, gap −10% | Gold pipe tint, star shimmer |
| `fog` | SHADOW REALM | Pipes flicker visible/hidden | Pipe opacity oscillates |
| `turbo` | OVERDRIVE | Speed +20%, bits ×1.5 | Cyan pipe tint, faster stars |
| `windfall` | WINDFALL | Every 10 pipes = +10 bonus BITS | Occasional coin rain |
| `chaos` | CHAOS FLUX | Pipe gap position randomizes more wildly | Pink glow |
| `blessed` | DIVINE GRACE | Start run with 3 shield charges | Purple sky tint |
| `none` | (standard) | Normal run | Normal |

### 3. SHARDS (Darkness Equivalent)
Separate meta-progression currency. Earned **on death** = `floor(score / 5) + 1`. Never earned other ways (death = the only source).

Used at the **Trait Forge** (new home screen section).

#### Trait Forge Tree
| ID | Name | Description | Cost | Max |
|---|---|---|---|---|
| `extra_life` | HARDENED | Start with +1 life | 30 shards | 1 |
| `relic_slot` | RELIC VAULT | +1 relic slot (unlock 3rd) | 60 shards | 1 |
| `pit_choice` | WIDER DRAW | Pit stop shows 4 choices | 40 shards | 1 |
| `shard_echo` | ECHO SHARDS | Earn 30% more shards per death | 25 shards | 2 |
| `combo_armor` | COMBO ARMOR | Combo of 8+ auto-activates shield | 35 shards | 1 |
| `omen_reroll` | OMEN SIGHT | Can reroll the omen once per run | 50 shards | 1 |

### 4. CLAW VOICE (Narrative Integration)
Short flavor text lines Claw "says" at key moments. Rendered as a speech bubble below the score area. 1-2 second auto-dismiss.

**Triggers:**
- Omen reveal: reacts to what omen you got
- Relic pick: comments on the relic chosen
- Pit stop: random banter
- Level up: celebration
- Death: self-aware wit
- Score milestones: (10, 25, 50, 100)

### 5. CURSED MODE (Heat Equivalent) [Stretch Goal]
Toggle optional curse modifiers before a run. Each active curse adds +50% shard yield from the run.
- "NO RESPAWNS" — die once = game over (loses lives system)
- "NARROW PIPES" — gap −25% always
- "BLINDING SPEED" — speed × 1.5 always

---

## What Carries Over from v1

- All 6 skins + skin unlock system (XP-based)
- 7 power-up cards (pit stop picks — now joined by relics)
- 4 permanent BITS-shop upgrades (Extra Life, Wide Gap, Flap Boost, XP Boost)
- Pipe themes by score bracket (forest → cyber → lava → cosmic)
- Combo system
- Full audio engine (all sfx)
- Canvas/rendering architecture
- In-run level system

---

## What Gets Upgraded

| v1 | v2 Change |
|---|---|
| Flat BITS shop | BITS shop + new Shard/Trait Forge |
| No run variety | World Omen each run |
| 3 card choices at pit stop | 3-4 choices, mix of cards + relics |
| No run-start choice | Relic pick before each run |
| Silent game | Claw Voice flavor text |
| Death = pure loss | Death = shard income |
| XP-only meta | XP/skins + Shards/Traits |

---

## v2 Scope

### P1 — Core (This Build)
- FC-001: Relic system (pick at run start, pit stop integration)
- FC-002: World Omen (per-run modifier, reveal screen)
- FC-003: Shard currency + earn on death
- FC-004: Trait Forge shop (6 traits)
- FC-005: Claw Voice flavor text
- FC-006: Relic HUD display (slot icons during run)

### P2 — Polish
- FC-007: Omen visual effects (tints, flicker)
- FC-008: Relic synergy hints (UI tells you when relics combo)
- FC-009: Run history / stats screen

### P3 — Stretch
- FC-010: Cursed Mode
- FC-011: Daily seed runs (same omen/relics for all players that day)
- FC-012: JojiOS stat integration (energy level → omen, streaks → relic bonuses)
