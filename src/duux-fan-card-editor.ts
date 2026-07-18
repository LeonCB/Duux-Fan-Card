import { LitElement, html, css, TemplateResult, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, fireEvent, LovelaceCardEditor } from "custom-card-helpers";
import { DuuxFanCardConfig, DEFAULT_DUUX_FAN_CARD_CONFIG } from "./types";

const SCHEMA = [
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
    ],
  },
];

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

  private _valueChanged(ev: CustomEvent): void {
    const newConfig: DuuxFanCardConfig = { ...ev.detail.value };

    if (newConfig.entity && newConfig.entity !== this._config.entity) {
      const stateObj = this.hass?.states[newConfig.entity];
      if (stateObj?.attributes.friendly_name) {
        newConfig.name = stateObj.attributes.friendly_name;
      }
    }

    this._config = newConfig;
    fireEvent(this as any, "config-changed", { config: newConfig });
  }

  private get _displayData(): DuuxFanCardConfig {
    const stateObj = this.hass?.states[this._config.entity];
    return {
      ...this._config,
      name: this._config.name ?? stateObj?.attributes.friendly_name ?? "",
      icon: this._config.icon ?? "mdi:fan",
    };
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._displayData}
        .schema=${SCHEMA}
        .computeLabel=${this._computeLabel}
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
