import { LitElement, html, css, TemplateResult, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, fireEvent, LovelaceCardEditor } from "./ha";
import {
  DuuxFanCardConfig,
  DEFAULT_DUUX_FAN_CARD_CONFIG,
  ALL_COLOR_KEYS,
  colorMode,
} from "./types";

const BASE_SCHEMA = [
  { name: "entity", required: true, selector: { entity: { domain: "fan" } } },
  { name: "name", selector: { text: {} } },
  { name: "icon", selector: { icon: {} } },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "show_name", selector: { boolean: {} } },
      { name: "show_percentage", selector: { boolean: {} } },
      { name: "show_speed", selector: { boolean: {} } },
      { name: "show_presets", selector: { boolean: {} } },
      { name: "show_oscillation", selector: { boolean: {} } },
      { name: "show_vertical_oscillation", selector: { boolean: {} } },
      { name: "show_timer", selector: { boolean: {} } },
      { name: "show_background", selector: { boolean: {} } },
      { name: "show_box_shadow", selector: { boolean: {} } },
      { name: "show_border", selector: { boolean: {} } },
    ],
  },
  {
    name: "color_mode",
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "default", label: "Standaard (kleuren van Home Assistant)" },
          { value: "theme", label: "Thema (--duux-fan-card-* uit je thema)" },
          { value: "manual", label: "Handmatig (kies hieronder)" },
        ],
      },
    },
  },
];

const COLOR_SCHEMA = {
  type: "expandable",
  name: "",
  title: "Kleuren",
  icon: "mdi:palette",
  flatten: true,
  expanded: true,
  schema: [
    {
      type: "grid",
      name: "",
      schema: ALL_COLOR_KEYS.map((k) => ({ name: k, selector: { color_rgb: {} } })),
    },
  ],
};

const LABELS: Record<string, string> = {
  entity: "Ventilator entiteit",
  name: "Naam",
  icon: "Icoon",
  show_name: "Toon naam",
  show_percentage: "Toon percentage",
  show_speed: "Toon snelheid",
  show_presets: "Toon presets",
  show_oscillation: "Toon horizontale oscillatie",
  show_vertical_oscillation: "Toon verticale oscillatie",
  show_timer: "Toon timer",
  show_background: "Toon achtergrond",
  show_box_shadow: "Toon schaduw",
  show_border: "Toon rand",
  color_mode: "Kleuren",
  accent_color: "Accentkleur",
  background: "Achtergrond",
  text_color: "Tekst",
  secondary_text_color: "Secundaire tekst",
  icon_color: "Icoon",
  off_color: "Bediening als de ventilator uit staat",
  border_color: "Rand",
};

const HELPERS: Record<string, string> = {
  color_mode:
    "Standaard volgt de kleuren van je Home Assistant-thema. Thema gebruikt ook de --duux-fan-card-* variabelen uit je thema. Handmatig gebruikt de kleuren die je hieronder kiest; een kleur die je niet kiest, volgt het thema.",
};

/* ---------- hex <-> [r, g, b] for the color_rgb selector ---------- */

const hexToRgb = (value: unknown): number[] | undefined => {
  if (typeof value !== "string") return undefined;
  const m = value.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return undefined;
  const hex = m[1].length === 3 ? m[1].replace(/./g, (ch) => ch + ch) : m[1];
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
};

const rgbToHex = (rgb: number[]): string =>
  "#" + rgb.map((n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0")).join("");

const sameRgb = (a?: number[], b?: number[]): boolean =>
  !!a && !!b && a.length === b.length && a.every((n, i) => n === b[i]);

// The color the card currently gets from the theme, as [r, g, b], so an
// unpicked color picker shows that instead of black.
const themeRgb = (cssValue: string): number[] | undefined => {
  const probe = document.createElement("span");
  probe.style.color = cssValue;
  probe.style.display = "none";
  document.body.appendChild(probe);
  const m = getComputedStyle(probe).color.match(/[\d.]+/g);
  probe.remove();
  return m && m.length >= 3 ? m.slice(0, 3).map((n) => Math.round(Number(n))) : undefined;
};

const THEME_PREVIEW: Record<string, string> = {
  accent_color: "var(--duux-fan-card-accent-color, var(--primary-color, #0a84ff))",
  background: "var(--duux-fan-card-background, var(--ha-card-background, var(--card-background-color, #1c1c1e)))",
  text_color: "var(--duux-fan-card-text-color, var(--primary-text-color, #fff))",
  secondary_text_color: "var(--duux-fan-card-secondary-text-color, var(--secondary-text-color, #9b9b9b))",
  icon_color: "var(--duux-fan-card-icon-color, var(--state-icon-color, #9b9b9b))",
  off_color: "var(--duux-fan-card-off-color, var(--secondary-text-color, #9b9b9b))",
  border_color: "var(--duux-fan-card-border-color, var(--divider-color, #7f7f7f))",
};

@customElement("duux-fan-card-editor")
export class DuuxFanCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: DuuxFanCardConfig;

  public setConfig(config: DuuxFanCardConfig): void {
    this._config = {
      ...DEFAULT_DUUX_FAN_CARD_CONFIG,
      ...config,
    };
  }

  private _computeLabel = (s: { name: string }): string =>
    LABELS[s.name] ?? s.name;

  private _computeHelper = (s: { name: string }): string | undefined =>
    HELPERS[s.name];

  private get _schema() {
    return colorMode(this._config) === "manual"
      ? [...BASE_SCHEMA, COLOR_SCHEMA]
      : BASE_SCHEMA;
  }

  private _valueChanged(ev: CustomEvent): void {
    const value = ev.detail.value as Record<string, any>;
    const newConfig: DuuxFanCardConfig = { ...value } as DuuxFanCardConfig;

    if (newConfig.entity && newConfig.entity !== this._config.entity) {
      const stateObj = this.hass?.states[newConfig.entity];
      if (stateObj?.attributes.friendly_name) {
        newConfig.name = stateObj.attributes.friendly_name;
      }
    }

    for (const key of ALL_COLOR_KEYS) {
      const v = value[key];
      const own = this._config[key];
      if (Array.isArray(v) && sameRgb(v, this._preview[key])) {
        // Untouched picker that only shows a preview: keep the theme
        // (no value) or the YAML value (var(), rgba(), ...) as it was
        if (own === undefined) delete newConfig[key];
        else newConfig[key] = own;
      } else if (Array.isArray(v)) {
        // Picked in the color picker
        newConfig[key] = rgbToHex(v);
      } else if (v === undefined && this._config[key] !== undefined) {
        // A YAML value the picker cannot show (var(), rgba(), ...) stays as is
        newConfig[key] = this._config[key];
      }
    }

    // Leaving "Handmatig" removes the manual colors from the config
    if (newConfig.color_mode && newConfig.color_mode !== "manual") {
      for (const key of ALL_COLOR_KEYS) delete newConfig[key];
    }

    this._config = newConfig;
    fireEvent(this as any, "config-changed", { config: newConfig });
  }

  private get _displayData(): Record<string, any> {
    const stateObj = this.hass?.states[this._config.entity];
    const data: Record<string, any> = {
      ...this._config,
      name: this._config.name ?? stateObj?.attributes.friendly_name ?? "",
      icon: this._config.icon ?? "mdi:fan",
      color_mode: colorMode(this._config),
    };
    this._preview = {};
    for (const key of ALL_COLOR_KEYS) {
      const own = this._config[key];
      if (own === undefined) {
        this._preview[key] = themeRgb(THEME_PREVIEW[key]);
        data[key] = this._preview[key];
      } else {
        // var()/rgba() values from YAML are resolved for display only
        data[key] = hexToRgb(own) ?? themeRgb(own);
        if (!hexToRgb(own)) this._preview[key] = data[key];
      }
    }
    return data;
  }

  // What each picker shows without a value of its own (see _displayData)
  private _preview: Record<string, number[] | undefined> = {};

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._displayData}
        .schema=${this._schema}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  static styles = css`
    ha-form {
      display: block;
    }
  `;
}
