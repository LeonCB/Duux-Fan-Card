# Duux Fan Card

A full-featured custom Lovelace card for **Duux / Whisper Flex** fans in Home Assistant. Exposes every capability of the fan in one card: power, speed, preset modes, horizontal and vertical oscillation, and the sleep timer.

![versie](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.github.com%2Frepos%2FLeonCB%2FDuux-Fan-Card%2Freleases%2Flatest&query=%24.tag_name&label=versie&color=blue)
![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2025.5%2B-41BDF5?logo=homeassistant&logoColor=white)
![license](https://img.shields.io/badge/license-MIT-green)

<!-- ha-marketplace:exclude-start -->
[![Open your Home Assistant instance and open this repository in the Marketplace.](https://my.home-assistant.io/badges/marketplace_repository.svg)](https://my.home-assistant.io/redirect/marketplace_repository/?owner=LeonCB&repository=Duux-Fan-Card&category=plugin)
<!-- ha-marketplace:exclude-end -->

## Requirements

- **Home Assistant 2025.5 or newer.** The card uses Home Assistant's typography variables (`--ha-font-size-m`, `--ha-font-size-s`), which were introduced in 2025.5. On older versions the card still works, but the text falls back to the inherited font size.
- A `fan` entity for your Duux fan. Tested with the **Duux Whisper Flex** through the [Tuya Local](https://github.com/make-all/tuya-local) integration.

## Features

- **Power** toggle — a round icon button with an animated spinning fan icon (speed-scaled) while on.
- **Speed slider** — snaps to the fan's own speed steps (`percentage_step`), so every position is a real fan speed.
- **Preset modes** — Normaal / Natuurlijk / Slaap. While the fan is off, a tap on a preset turns the fan on directly in that mode.
- **Readable off state** — while the fan is off, the controls use a muted but readable color (`--duux-off`, default: the theme's secondary text color) instead of the theme's disabled grey.
- **Horizontal oscillation** toggle (`fan.oscillate`).
- **Vertical oscillation** toggle (the separate `switch.*_vertical_oscillation` entity).
- **Timer** dropdown (From 1 to 12 hours) on the same row as the oscillation toggles.
- **Optional background, shadow & border** — toggle the card background (`show_background`), drop shadow (`show_box_shadow`) and border (`show_border`) independently.
- **Theme-aware text shadow** — both the name and the status text use `var(--entity-text-shadow, none)`, so they automatically pick up a theme's entity text-shadow variable (e.g. `blue_metal_dark`) with a clean fallback (no shadow) elsewhere.
- **Unavailable state** — when the fan is offline, the status reads "Niet beschikbaar" and all controls are disabled.
- **Visual editor** Toggle the options you need.

<!-- ha-marketplace:exclude-start -->
## Installation

### Marketplace (Home Assistant 2026.11 and newer)

Click the **Open in Marketplace** button at the top of this page and confirm to add the repository. Then install **Duux Fan Card** and reload your browser.

Or add it by hand:

1. Go to **Settings → Marketplace** and select **Add from link** in the upper-right corner.
2. Enter `LeonCB/Duux-Fan-Card` and select **Add**. If asked for the type, choose **Dashboard**.
3. Install **Duux Fan Card** and reload your browser.

The Marketplace may ask you to connect GitHub before you can add a repository.

### HACS (Home Assistant 2025.5 – 2026.10)

1. In HACS go to **⋮ → Custom repositories**.
2. Add `https://github.com/LeonCB/Duux-Fan-Card` with type **Dashboard**.
3. Install **Duux Fan Card** and reload your browser.

### Dashboard resource

The Marketplace and HACS register the resource automatically. For YAML-mode dashboards add:

```yaml
resources:
  - url: /local/community/Duux-Fan-Card/duux-fan-card.js
    type: module
```

The older path `/hacsfiles/Duux-Fan-Card/duux-fan-card.js` keeps working.
<!-- ha-marketplace:exclude-end -->

## Configuration

Add via the dashboard UI ("Add card → Duux Fan Card") or in YAML:

```yaml
type: custom:duux-fan-card
entity: fan.whisper_flex_woonkamer
```

All companion entities are auto-detected from the fan's entity id. Override only if yours differ.

### Editor (GUI)

The visual editor exposes the entity, name, icon, the show/hide toggles below and the color mode (**Kleuren**). With **Handmatig** a set of color pickers appears. Radius, font weight and text shadow remain YAML-only options (see below).

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
| `show_background` | boolean | `true` | Card background color. `false` = transparent |
| `show_box_shadow` | boolean | `true` | Card drop shadow. `false` = no shadow |
| `show_border` | boolean | `true` | Card border. `false` = no border |
| `color_mode` | string | see below | `default`, `theme` or `manual` — see [Color mode](#color-mode) |

### Color mode

| `color_mode` | Editor | Colors come from |
|---|---|---|
| `default` | Standaard | Home Assistant's own theme colors (`--primary-color`, `--primary-text-color`, …). `--duux-fan-card-*` theme variables are ignored. |
| `theme` | Thema | The `--duux-fan-card-*` variables in your theme (see [Theme variables](#theme-variables)), falling back to the Home Assistant colors. |
| `manual` | Handmatig | The color options on the card (`accent_color`, `background`, `text_color`, `secondary_text_color`, `icon_color`, `off_color`, `border_color`). A color you leave out follows the theme. |

Without `color_mode` the card behaves as before: `manual` when any color option is set, otherwise `theme`. Switching to **Standaard** or **Thema** in the editor removes the manual colors from the config. The editor's color pickers save hex values; in YAML any CSS color works (`rgba()`, `var(--…)`), and the editor keeps such a value unless you pick a new color.

### Styling options

The color options are used with `color_mode: manual` and can be picked in the editor; `border_radius`, `font_weight` and `text_shadow` are YAML-only and always apply:

| Option | Example | Description |
|---|---|---|
| `accent_color` | `#0a84ff` | Active/highlight color |
| `background` | `var(--ha-card-background)` | Card background (only applied when `show_background` is `true`) |
| `text_color` | `#ffffff` | Primary text |
| `secondary_text_color` | `#9b9b9b` | Secondary text |
| `icon_color` | `#9b9b9b` | Resting icon color |
| `off_color` | `#8e959e` | Text/icon color of the controls while the fan is off (default: `secondary_text_color`, i.e. the theme's secondary text color) |
| `border_radius` | `16px` | Corner radius |
| `font_weight` | `500` | Text weight |
| `text_shadow` | `0 1px 2px rgba(0,0,0,.6)` | CSS text-shadow on chips/buttons (the name and status text instead follow the theme's `--entity-text-shadow`) |
| `border_color` | `#4da3ff` | Border color/CSS value, used only when `show_border` is `true` (default: theme divider color) |

### Theme variables

Every styling option also has a CSS variable that a theme can set, so the card is styled from the first render without card-mod or UIX (no flash of unstyled content). They are used with `color_mode: theme` (and, for colors you leave out, with `manual`); `border_radius`, `font_weight` and `text_shadow` follow them in every mode unless the card sets its own value.

| Theme variable | Same as option | Default |
|---|---|---|
| `duux-fan-card-accent-color` | `accent_color` | `var(--primary-color)` |
| `duux-fan-card-background` | `background` | `var(--ha-card-background)` |
| `duux-fan-card-text-color` | `text_color` | `var(--primary-text-color)` |
| `duux-fan-card-secondary-text-color` | `secondary_text_color` | `var(--secondary-text-color)` |
| `duux-fan-card-icon-color` | `icon_color` | `var(--state-icon-color)` |
| `duux-fan-card-off-color` | `off_color` | the secondary text color |
| `duux-fan-card-border-radius` | `border_radius` | `var(--ha-card-border-radius)` |
| `duux-fan-card-font-weight` | `font_weight` | `500` |
| `duux-fan-card-text-shadow` | `text_shadow` | `none` |
| `duux-fan-card-box-shadow` | — | `var(--ha-card-box-shadow)` |
| `duux-fan-card-border-color` | `border_color` | `var(--divider-color)` |

`show_background: false`, `show_box_shadow: false` and `show_border: false` still switch the background, shadow and border off, whatever the theme sets.

```yaml
# in your theme
my_theme:
  duux-fan-card-accent-color: "#4da3ff"
  duux-fan-card-font-weight: "600"
```

### Full example

```yaml
type: custom:duux-fan-card
entity: fan.whisper_flex_woonkamer
name: Woonkamer ventilator
show_background: false
color_mode: manual
accent_color: "#4da3ff"
font_weight: "600"
border_radius: 18px
```

## License

Released under the [MIT License](LICENSE).
