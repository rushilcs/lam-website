# PRD — Lakshmi Valentine Website (Vite + React + TS)

## Goal
Create a single-page interactive Valentine website with a short intro sequence, a recreated timeline, a date-picker “quiz” gate (Jan 12, 2026), then the Valentine question with a runaway “No” button and a “Catch the Heart” minigame required to confirm “Yes”.

Primary success: feels thoughtful + playful within 1–2 minutes, mobile-first, no cringe pressure.

## Platform & Stack
- SPA (no backend)
- Vite + React + TypeScript (npm)
- Plain CSS in `src/styles.css`
- Confetti implemented with `<canvas>` + requestAnimationFrame
- No external images/assets
- No autoplay audio

## App State Machine
States (steps) in order:
1. intro1: “hi lakshmi”
2. intro2: “i know our timeline has been a bit messy”
3. intro3: “so i thought i'd recreate it”
4. timeline: timeline displayed
5. dateQuiz: user must select date for last timeline item
6. valentine: “Will you be my Valentine?” (red background)
7. game: modal “Catch the Heart”
8. final: final confirmation screen

Transitions:
- intro1 -> intro2 -> intro3 auto-advance (timed)
- intro3 -> timeline auto-advance
- timeline -> dateQuiz (can be same screen; must present date picker prompt)
- dateQuiz -> valentine only when correct date selected (Jan 12, 2026)
- valentine -> game on YES
- game -> valentine on close/ESC
- game -> final on win

## Screen Requirements

### Intro Screens (intro1, intro2, intro3)
- Each is full viewport.
- Content: ONLY one line of large centered text.
- Background: white/near-white.
- Text color: red.
- Timing: ~1.1 seconds each (configurable constant).
- Transition: fade + subtle vertical slide (unless reduced motion).

Exact copy:
- intro1: “hi lakshmi”
- intro2: “i know our timeline has been a bit messy”
- intro3: “so i thought i'd recreate it”

### Timeline (timeline)
Timeline items in exact order:
1) First time we met
2) First time we kissed
3) When I asked you to be my girlfriend
4) We broke up (we’re not naming the date 😭)  -> date is “—”
5) It got kinda messy
6) We started talking again  -> last item, date must be chosen via date picker

Dates:
- Placeholder dates OK for items 1–3 and 5.
- Breakup item date fixed to “—”.
- Last item initially shows no date / placeholder until chosen.

Layout:
- Vertical timeline, centered, max width 420px
- Clean dots + line

### Date Quiz (dateQuiz)
Purpose: user picks the date for “We started talking again” using a calendar UI.

UI:
- Timeline remains visible.
- Last item is visually highlighted.
- Show prompt: “Pick the date we started talking again”
- Use native calendar input: `<input type="date">`
  - min: 2025-01-01
  - max: 2026-12-31

Validation:
- Correct date: 2026-01-12 (Jan 12, 2026)
- On correct date:
  - show a small success message (“okay yeah 🥺”)
  - automatically transition to `valentine` after 600ms
- On incorrect date:
  - show gentle inline error: “hmm… try again :)”
  - allow re-select, no penalties

### Valentine Screen (valentine)
- Full viewport with solid red background.
- Centered big text: “Will you be my Valentine?”
- Buttons: YES (primary) and NO (secondary runaway).

Runaway NO requirements:
- Trigger on pointerenter and pointerdown/touchstart.
- Escalation:
  - Attempts 1–2: move 60–90px, duration 160ms
  - Attempts 3–5: move 120–180px, duration 120ms
  - Attempts 6–8: move 220–320px, duration 90ms; label cycles among:
    ["No", "Nope", "Not a chance", "Nice try", "lol no"]
  - Attempt 9: fade out over 220ms then remove from layout.
- Must clamp within viewport with >=16px margin.
- Mobile: dodge before click completes.
- After removal, show caption: “okay you’re persistent 😭”

### Game Modal (game)
- Modal opens on YES.
- Backdrop dim + panel.
- Title: “Catch the Heart”
- Instruction: “Tap the heart to win.”
- Heart bounces with requestAnimationFrame.
- Speed increases every 1.2s by 6%, capped.
- Close X + ESC always available; returns to Valentine screen.
- Focus trapped in modal.

Win condition:
- Tap/click heart => win immediately => close modal and transition to final.

### Final Screen (final)
Exact copy:
- Heading: “Guess I’m your Valentine now 💘”
- Subtext: “I was hoping you’d catch that heart.”
- Footer: “Happy Valentine’s Day.”

Effects:
- One-time confetti burst on entry (1.4 seconds then stops and removes canvas)
- Optional subtle floating hearts

No follow-ups:
- No extra CTAs
- No buttons
- No share prompts

## Accessibility & Preferences
- Keyboard navigation for all interactive controls
- Focus trap in modal
- ESC closes modal
- prefers-reduced-motion disables slide transitions, floating hearts, and confetti

## Acceptance Criteria
- Intro sequence auto-advances with correct copy and transitions
- Timeline renders in correct order; breakup shows “—”; last item has date quiz
- Date quiz only advances on 2026-01-12
- Valentine screen has runaway NO with correct escalation and clamped movement
- YES opens game modal; heart movement works; click heart wins
- Final screen shows exact copy and confetti runs once then stops
- Mobile usable; tap targets >=44px; no trapping