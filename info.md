# Duux Fan Card

A full-featured custom Lovelace card for **Duux / Whisper Flex** fans in Home Assistant. Exposes every capability of the fan in one card: power, speed, preset modes, horizontal and vertical oscillation, and the sleep timer.

![version](https://img.shields.io/badge/version-1.0.0-blue)

## Features

- **Power** toggle — a round icon button with an animated spinning fan icon (speed-scaled) while on.
- **Speed slider** — Continuous 0–100%, maps to the fan's native steps.
- **Preset modes** — Normaal / Natuurlijk / Slaap .
- **Horizontal oscillation** toggle (`fan.oscillate`).
- **Vertical oscillation** toggle (the separate `switch.*_vertical_oscillation` entity).
- **Timer** dropdown (From 1 to 12 hours) on the same row as the oscillation toggles.
- **Optional background** — toggle the card background/shadow on or off (`show_background`); on by default.
- **Theme-aware text shadow** — both the name and the status text use `var(--entity-text-shadow, none)`, so they automatically pick up a theme's entity text-shadow variable (e.g. `blue_metal_dark`) with a clean fallback (no shadow) elsewhere.
- **Visual editor** Toggle the options you need.

## Installation (HACS — custom repository)

1. In HACS go to **⋮ → Custom repositories**.
2. Add `https://github.com/LeonCB/Duux-Fan-Card` with category **Lovelace** (Dashboard).
3. Install **Duux Fan Card** and reload your browser.

The resource is registered automatically by HACS. For YAML-mode dashboards add:

```yaml
resources:
  - url: /hacsfiles/Duux-Fan-Card/duux-fan-card.js
    type: module
```

## Configuration

Add via the dashboard UI ("Add card → Duux Fan Card") or in YAML:

```yaml
type: custom:duux-fan-card
entity: fan.whisper_flex_woonkamer
```

All companion entities are auto-detected from the fan's entity id. Override only if yours differ.

### Editor (GUI)

The visual editor exposes the entity, name, icon, and the show/hide toggles below. It does **not** expose color/shadow/radius styling — those remain available as YAML-only options (see below) since most users don't need them.

| Option | Type | Default | Description |
|---|---|---|---|
| `entity` | string | **required** | The `fan.*` entity |
| `timer_entity` | string | auto | `select.*_timer` |
| `vertical_oscillation_entity` | string | auto | `switch.*_vertical_oscillation` |
| `name` | string | entity's friendly name | Card title (auto-filled in the editor) |
| `icon` | string | `mdi:fan` | Power icon (auto-filled in the editor) |
| `show_name` | boolean | `true` | Name text, shown above the speed slider (icon stays always visible) |
| `show_percentage` | boolean | `true` | Status text ("xx%"/"Uit"), shown above the speed slider |
| `show_speed` | boolean | `true` | Speed slider, shown next to the power icon |
| `show_presets` | boolean | `true` | |
| `show_oscillation` | boolean | `true` | Horizontal |
| `show_vertical_oscillation` | boolean | `true` | |
| `show_timer` | boolean | `true` | |
| `show_background` | boolean | `true` | Card background + shadow. `false` = fully transparent |

### Styling options (YAML only)

Not shown in the GUI editor, but fully supported in YAML:

| Option | Example | Description |
|---|---|---|
| `accent_color` | `#0a84ff` | Active/highlight color |
| `background` | `var(--ha-card-background)` | Card background (only applied when `show_background` is `true`) |
| `text_color` | `#ffffff` | Primary text |
| `secondary_text_color` | `#9b9b9b` | Secondary text |
| `icon_color` | `#9b9b9b` | Resting icon color |
| `border_radius` | `16px` | Corner radius |
| `font_weight` | `500` | Text weight |
| `text_shadow` | `0 1px 2px rgba(0,0,0,.6)` | CSS text-shadow on chips/buttons (the name and status text instead follow the theme's `--entity-text-shadow`) |

### Full example

```yaml
type: custom:duux-fan-card
entity: fan.whisper_flex_woonkamer
name: Woonkamer ventilator
show_background: false
accent_color: "#4da3ff"
font_weight: "600"
border_radius: 18px
```

## License

MIT
