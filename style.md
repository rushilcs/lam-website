## Screen-Specific Styling

### Intro Screens (intro1/intro2/intro3)
- Background: pure white (#ffffff) or near-white.
- Text color: use a strong red (use --primary or define --introRed).
- Content: ONLY one line of text, centered both vertically and horizontally.
- Text size: larger than normal headings:
  - mobile: 44–52px
  - desktop: 64–76px
- Letter spacing: very slight (-0.5px to 0px), keep clean.
- No hearts background on intros (keep it minimal).
- Transition between intro screens:
  - fade + translateY(10px) (unless reduced motion)

### Timeline Screen
- Background can return to --bg.
- Timeline remains the main focus (centered), with generous breathing room.
- Highlight “We started talking again” when date quiz is active:
  - slightly brighter dot, subtle glow, or a soft background pill behind the row.

### Date Picker UI
- Use native `<input type="date">` styled to match:
  - height: 44–48px
  - border radius: 12–14px
  - border: 1px solid var(--border)
  - background: rgba(255,255,255,0.85)
- Inline helper text states:
  - neutral prompt text: var(--muted)
  - incorrect: same muted tone (do NOT use harsh error red)
  - correct: small celebratory text (still subtle)

### Valentine Screen (Will you be my Valentine?)
- Background: solid red field (use --primary as the page background).
- Text color: white.
- Buttons:
  - YES button: white background with red text OR keep primary button but ensure contrast on red background.
  - NO button: white background + border; readable on red.
- Keep the layout centered with enough spacing:
  - question text
  - buttons row
  - optional caption after NO disappears

### Reduced Motion Overrides
- Intro transitions: replace translate with pure opacity change (or instant swap).
- Confetti disabled.
- Floating hearts disabled.
- NO button still moves (functional), but keep movement transitions shorter or instant.