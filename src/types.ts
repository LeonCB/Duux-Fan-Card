import { LovelaceCardConfig } from "custom-card-helpers";

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
};

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
  accent_color?: string;            // active/highlight color
  background?: string;              // card background (used only when show_background is true)
  text_color?: string;             // primary text color
  secondary_text_color?: string;
  icon_color?: string;             // resting icon color
  border_radius?: string;          // e.g. "16px"
  font_weight?: string;            // e.g. "500"
  text_shadow?: string;            // e.g. "0 1px 2px rgba(0,0,0,.6)"
}
