---
name: AI Finance Transformation
description: Professional consulting-style (BCG/McKinsey) design aesthetic for web-based business interfaces. Use when creating dashboards, presentations, reports, or any professional data-driven interface that needs clean, modern, business consulting visual language. Focus on typography, color systems, spacing principles, and professional interaction patterns rather than specific layouts.
---

# Consulting Dashboard Aesthetics

Professional design language inspired by top-tier management consulting firms (BCG, McKinsey, Bain). Prioritizes restraint, data legibility, and executive credibility over visual decoration.

---

## Core Principles

**Clean Minimalism** — White/light backgrounds, subtle borders, no ornamentation. Let data speak.

**Professional Restraint** — No gradients (except flat dark summary sections), no heavy shadows, conservative radius.

**Hierarchy via Typography & Weight** — Size and weight create structure, not decorative elements. Color used only to convey meaning.

**Landscape-First** — Business tools run on laptops. Optimize for 16:9/16:10. Minimize vertical scroll.

---

## Typography

### Font Stack

**Numbers & Titles:** Montserrat (600–800 weight)
- Use for: All numerical values, page titles, section headers, KPIs

**Body & Labels:** IBM Plex Sans (400–600 weight)
- Use for: Descriptions, labels, body text, UI elements

```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

### Type Scale

| Element | Size | Font | Weight |
|---|---|---|---|
| Hero numbers | 36–48px | Montserrat | 800 |
| Page title | 26–32px | Montserrat | 700 |
| Section headers | 14–18px | Montserrat | 700 |
| Metric values | 15–18px | Montserrat | 600–700 |
| Body / labels | 12–14px | IBM Plex Sans | 400–500 |
| Small labels | 10–11px | IBM Plex Sans | 500–600 |

**Uppercase labels:** Add `letter-spacing: 0.7–1.2px`
**Line height:** 1.4–1.6 for body, 1.1–1.2 for hero numbers

---

## Color System

### Primary Palette (Sober, Formal)

```
Primary Blue:  #1a3a5c  — deep navy. Actions, key metrics, brand.
Positive:      #2d6a4f  — muted forest green. Growth, success.
Negative:      #922b21  — dark burgundy. Alerts, declines.
Caution:       #9a6f00  — dark gold. Watch states (use sparingly).
Accent:        #4a6fa5  — steel blue. Secondary highlights, chart series.
```

### Neutral Palette

```
Text primary:      #0d1b2a  — near-black with blue undertone. Headlines, key data.
Text secondary:    #6b7280  — mid-gray. Labels, supporting text.
Text tertiary:     #9ca3af  — light gray. Disabled, placeholders.

Background page:   #f8f9fb  — off-white.
Surface card:      #ffffff  — white.
Surface secondary: #f3f4f6  — light gray. Hover, secondary panels.
Border:            #e5e7eb  — card borders, dividers.
Border inner:      #f3f4f6  — row separators within components.
```

### Dark Summary Palette

Used for totals/conclusions sections only. Flat background — no gradients.

```
Background:   #0d1b2a  — flat deep navy.
Surface alt:  #1a2e45  — slightly lighter for inner dividers.
Text:         #ffffff
Text muted:   rgba(255,255,255,0.45)
Dividers:     rgba(255,255,255,0.10)
```

### Color Usage Rules

1. Each color has a fixed semantic meaning — never repurpose (e.g., don't use positive green for non-positive data)
2. Design works in grayscale first — color reinforces, not replaces, structure
3. Backgrounds are mostly neutral; color appears in accents, values, and status indicators
4. Ensure WCAG AA contrast minimum at all times

---

## Multi-Series Chart Colors

When displaying 2–5 data series (line, bar, area charts), use this ordered sequence:

| Series | Color | Hex |
|---|---|---|
| Series 1 | Deep navy | `#1a3a5c` |
| Series 2 | Steel blue | `#4a6fa5` |
| Series 3 | Muted forest green | `#2d6a4f` |
| Series 4 | Dark gold | `#9a6f00` |
| Series 5 | Slate gray | `#64748b` |

**Chart styling rules:**
- Line charts: 2.5px stroke, no fill (or `rgba` fill at 6–8% opacity max)
- Point radius: 4px
- Grid lines: `#f3f4f6` (very faint)
- Axis labels: IBM Plex Sans 11px, `#9ca3af`
- Tooltip background: `#0d1b2a`, IBM Plex Sans body, Montserrat title
- Legend: top-right, `usePointStyle: true`, IBM Plex Sans 11px

### Waterfall Charts

Use the semantic palette for bar coloring:
- **Base / Total bars:** `#1a3a5c` (deep navy) — anchors both ends of the chart
- **Positive bars:** `#2d6a4f` (muted forest green)
- **Negative bars:** `#922b21` (dark burgundy)
- **Connector lines:** `1px dashed #e5e7eb` linking bar tops across segments

**Label placement — critical rule:**
Labels must always be positioned **outside** the bar, never rendered on top of the filled area. A label sitting inside a bar loses contrast and becomes unreadable, especially on short bars.

- Positive bars: label **above** the bar top (`textBaseline: 'bottom'`, offset `−5px` from bar top)
- Negative bars: label **below** the bar bottom (`textBaseline: 'top'`, offset `+5px` from bar bottom)
- Base / Total bars: label **above** the bar top

Label color should match the bar color (green for positive, burgundy for negative, navy for base/total) so the semantic meaning is reinforced at a glance. Font: Montserrat 700 11px.

---

## Spacing

Based on 4px increments:

| Token | Value | Use |
|---|---|---|
| xs | 4px | Tight internal gaps |
| sm | 8px | Gaps between related items |
| md | 12px | Standard element gap |
| lg | 16px | Breathing room within components |
| xl | 24px | Between component groups / section padding |
| 2xl | 32px | Major section breaks |
| 3xl | 48px | Page margins |

**Rule:** Related items closer together, unrelated items further apart.

---

## Component Patterns

### Cards

```css
background: #ffffff;
border: 1px solid #e5e7eb;
border-radius: 6–8px;
padding: 16–24px;
```

Hover state:
```css
box-shadow: 0 4px 12px rgba(0,0,0,0.08);
transform: translateY(-2px);
transition: all 0.2s ease;
```

**Accent bars** — left edge only, 4px wide, category color:
```css
.accent-bar {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 4px;
  border-radius: 8px 0 0 8px;
  background: [series-color];
}
```

### Buttons

Primary:
```css
background: #1a3a5c;
color: white;
padding: 8–12px 20–28px;
border-radius: 5–6px;
font-family: 'IBM Plex Sans';
font-weight: 600;
font-size: 13–15px;
border: none;
cursor: pointer;
transition: background 0.2s;
```
Hover: darken to `#0f2540`

Secondary:
```css
background: #f3f4f6;
color: #374151;
border: 1px solid #d1d5db;
```
Hover: `#e5e7eb`

### Metric Rows

```css
.metric-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8–12px 0;
  border-bottom: 1px solid #f3f4f6;
}
.metric-label {
  font-family: 'IBM Plex Sans';
  font-size: 11–13px;
  font-weight: 500;
  color: #6b7280;
}
.metric-value {
  font-family: 'Montserrat';
  font-size: 15–18px;
  font-weight: 600–700;
  color: #0d1b2a;
}
```

### Summary / Totals Section

Flat dark panel — no gradient:

```css
background: #0d1b2a;
color: white;
padding: 24–32px;
border-radius: 6–8px;
```

Inner dividers between items: `border-right: 1px solid rgba(255,255,255,0.10)`

---

## Interaction & Motion

```css
transition: all 0.2s ease;
/* or */
transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
```

**Animate:** background-color, box-shadow, opacity, transform (translate/scale)
**Never animate:** layout dimensions, font sizes, margin/padding

---

## What to Avoid

**Typography:** Serif decorative fonts, more than 2 font families, mixed number fonts (use Montserrat for all numbers)

**Color:** Warm/earthy tones (browns, oranges, terracotta), oversaturated colors, rainbow palettes, color as sole differentiator (accessibility)

**Layout:** Cramped spacing, excessive vertical scroll, center-aligning body text, unequal emphasis on equal-priority items

**Styling:** Heavy shadows, gradients in non-summary contexts, busy backgrounds, ornamental borders

**Motion:** Animations >300ms, decorative animations, inconsistent hover states, unclear click targets

---

## Adaptation Reference

| Context | Adjustment |
|---|---|
| Dense data tables | Reduce padding to 8–12px, 11px fonts, alternate row bg `#f9fafb`/`#fff` |
| Executive dashboards | Increase spacing to 24–32px, hero numbers 40–56px, more whitespace |
| Interactive tools | Clear affordances on controls, primary navy for active/selected states |
| Portrait screens | Stack cards vertically, maintain widths |
| Ultra-wide | Consider 4-column layouts |

---

## Quick Reference

| Property | Value |
|---|---|
| Primary blue | `#1a3a5c` |
| Positive green | `#2d6a4f` |
| Negative red | `#922b21` |
| Caution gold | `#9a6f00` |
| Accent blue | `#4a6fa5` |
| Text primary | `#0d1b2a` |
| Border | `1px solid #e5e7eb`, radius 6–8px |
| Shadow max | `0 4px 12px rgba(0,0,0,0.08)` |
| Transition | `0.2s ease` |
| Fonts | Montserrat (numbers/titles) + IBM Plex Sans (body) |
| Spacing | 8–12px tight · 16–24px standard · 32–48px generous |
| Summary bg | `#0d1b2a` flat (no gradient) |
| Chart series | Navy → Steel blue → Forest green → Dark gold → Slate |
