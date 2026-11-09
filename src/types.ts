import { LovelaceCardConfig } from "./ha";

export const DEFAULT_DUUX_FAN_CARD_CONFIG: Partial<DuuxFanCardConfig> = {
  show_name: true,
  show_percentage: true,
  show_speed: true,
  show_presets: true,
  show_oscillation: true,
  show_vertical_oscillation: true,
  show_timer: true,
  show_background: true,
  show_box_shadow: true,
  show_border: true,
};

export type ColorMode = "default" | "theme" | "manual";

// Color options and the internal CSS variable each one sets.
// border_color is handled separately (it is part of the border shorthand).
export const COLOR_OPTIONS: Record<string, string> = {
  accent_color: "--duux-accent",
  background: "--duux-bg",
  text_color: "--duux-text",
  secondary_text_color: "--duux-text2",
  icon_color: "--duux-icon",
  off_color: "--duux-off",
};

export const ALL_COLOR_KEYS = [...Object.keys(COLOR_OPTIONS), "border_color"];

// "Standaard": plain Home Assistant theme colors, no --duux-fan-card-* variables
export const HA_DEFAULT_COLORS: Record<string, string> = {
  accent_color: "var(--primary-color, #0a84ff)",
  background: "var(--ha-card-background, var(--card-background-color, #1c1c1e))",
  text_color: "var(--primary-text-color, #fff)",
  secondary_text_color: "var(--secondary-text-color, #9b9b9b)",
  icon_color: "var(--state-icon-color, #9b9b9b)",
  off_color: "var(--secondary-text-color, #9b9b9b)",
  border_color: "var(--divider-color, rgba(127,127,127,0.3))",
};

// Without color_mode (configs from before 2026.11.3) the card keeps its old
// behaviour: color options set in YAML are used, otherwise the theme.
export const colorMode = (c: Partial<DuuxFanCardConfig>): ColorMode =>
  c.color_mode ?? (ALL_COLOR_KEYS.some((k) => c[k]) ? "manual" : "theme");

export interface DuuxFanCardConfig extends LovelaceCardConfig {
  type: string;
  entity: string;

  // Optional companion entities. If omitted, the card auto-discovers them
  // by replacing the fan. prefix with the matching domain + suffix.
  timer_entity?: string;             // select.<base>_timer
  vertical_oscillation_entity?: string; // switch.<base>_vertical_oscillation

  name?: string;
  icon?: string;

  // Feature toggles
  show_name?: boolean;
  show_percentage?: boolean;
  show_speed?: boolean;
  show_presets?: boolean;
  show_oscillation?: boolean;
  show_vertical_oscillation?: boolean;
  show_timer?: boolean;

  // Styling options (the "opmaakmogelijkheden binnen de kaart zelf")
  show_background?: boolean;        // whether the card has a background at all
  show_box_shadow?: boolean;        // whether the card shows its drop shadow
  show_border?: boolean;            // whether the card has a border
  color_mode?: ColorMode;           // default = HA theme, theme = --duux-fan-card-*, manual = options below
  border_color?: string;            // border color/CSS value (used with color_mode: manual)
  accent_color?: string;            // active/highlight color
  background?: string;              // card background (used only when show_background is true)
  text_color?: string;             // primary text color
  secondary_text_color?: string;
  icon_color?: string;             // resting icon color
  off_color?: string;              // text/icon color of the controls while the fan is off
  border_radius?: string;          // e.g. "16px"
  font_weight?: string;            // e.g. "500"
  text_shadow?: string;            // e.g. "0 1px 2px rgba(0,0,0,.6)"
}
