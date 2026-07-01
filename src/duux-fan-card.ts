import { LitElement, html, css, PropertyValues, TemplateResult, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, fireEvent } from "custom-card-helpers";
import { DuuxFanCardConfig, DEFAULT_DUUX_FAN_CARD_CONFIG } from "./types";
import "./duux-fan-card-editor";

const CARD_VERSION = "1.0.0";

/* eslint-disable no-console */
console.info(
  `%c DUUX-FAN-CARD %c ${CARD_VERSION} `,
  "color: white; background: #0a84ff; font-weight: 700;",
  "color: #0a84ff; background: white; font-weight: 700;"
);

// Register in the card picker
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "duux-fan-card",
  name: "Duux Fan Card",
  description: "Full-featured control card for Duux / Whisper Flex fans",
  preview: true,
  documentationURL: "https://github.com/yourname/duux-fan-card",
});

const PRESET_ICONS: Record<string, string> = {
  normal: "mdi:fan",
  nature: "mdi:leaf",
  sleep: "mdi:weather-night",
};

const PRESET_LABELS_NL: Record<string, string> = {
  normal: "Normaal",
  nature: "Natuurlijk",
  sleep: "Slaap",
};

const TIMER_LABELS_NL: Record<string, string> = {
  cancel: "Geen timer",
  "1h": "1 uur",
  "2h": "2 uur",
  "3h": "3 uur",
  "4h": "4 uur",
  "5h": "5 uur",
  "6h": "6 uur",
  "7h": "7 uur",
  "8h": "8 uur",
  "9h": "9 uur",
  "10h": "10 uur",
  "11h": "11 uur",
  "12h": "12 uur",
};

@customElement("duux-fan-card")
export class DuuxFanCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: DuuxFanCardConfig;

  public static async getConfigElement(): Promise<HTMLElement> {
    return document.createElement("duux-fan-card-editor");
  }

  public static getStubConfig(hass: HomeAssistant): DuuxFanCardConfig {
    const fan = Object.keys(hass.states).find((e) => e.startsWith("fan."));
    const entityId = fan || "fan.whisper_flex_woonkamer";
    const stateObj = hass.states[entityId];
    return {
      type: "custom:duux-fan-card",
      entity: entityId,
      name: stateObj?.attributes.friendly_name ?? "Ventilator",
      icon: "mdi:fan",
      ...DEFAULT_DUUX_FAN_CARD_CONFIG,
    } as DuuxFanCardConfig;
  }

  public setConfig(config: DuuxFanCardConfig): void {
    if (!config.entity || !config.entity.startsWith("fan.")) {
      throw new Error("You must specify a fan entity");
    }
    this._config = {
      ...DEFAULT_DUUX_FAN_CARD_CONFIG,
      ...config,
    };
  }

  public getCardSize(): number {
    return 4;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this._config) return false;
    if (changedProps.has("_config")) return true;

    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
    if (!oldHass) return true;

    if (oldHass.states[this._config.entity] !== this.hass.states[this._config.entity]) {
      return true;
    }
    // Also refresh on changes to companion entities (timer, vertical oscillation)
    const vEnt = this._companion(
      "vertical_oscillation",
      "switch",
      this._config.vertical_oscillation_entity
    );
    const timerEnt = this._companion("timer", "select", this._config.timer_entity);
    for (const ent of [vEnt, timerEnt]) {
      if (ent && oldHass.states[ent] !== this.hass.states[ent]) return true;
    }
    return false;
  }

  /* ---------- entity resolution helpers ---------- */

  private get _base(): string {
    return this._config.entity.replace(/^fan\./, "");
  }

  private _companion(suffix: string, domain: string, explicit?: string): string | undefined {
    if (explicit) return explicit;
    const guess = `${domain}.${this._base}_${suffix}`;
    return this.hass.states[guess] ? guess : undefined;
  }

  /* ---------- service calls ---------- */

  private _togglePower = (): void => {
    this.hass.callService("fan", "toggle", { entity_id: this._config.entity });
  };

  private _setSpeed = (e: Event): void => {
    const pct = Number((e.target as HTMLInputElement).value);
    this.hass.callService("fan", "set_percentage", {
      entity_id: this._config.entity,
      percentage: pct,
    });
  };

  private _setPreset(mode: string): void {
    this.hass.callService("fan", "set_preset_mode", {
      entity_id: this._config.entity,
      preset_mode: mode,
    });
  }

  private _toggleOscillation(current: boolean): void {
    this.hass.callService("fan", "oscillate", {
      entity_id: this._config.entity,
      oscillating: !current,
    });
  }

  private _toggleVertical(entityId: string): void {
    this.hass.callService("switch", "toggle", { entity_id: entityId });
  }

  private _setTimer(entityId: string, value: string): void {
    this.hass.callService("select", "select_option", {
      entity_id: entityId,
      option: value,
    });
  }

  private _moreInfo(entityId: string): void {
    fireEvent(this as any, "hass-more-info", { entityId });
  }

  /* ---------- render ---------- */

  protected render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;

    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card
        ><div class="warning">Entity ${this._config.entity} not found</div></ha-card
      >`;
    }

    const isOn = stateObj.state === "on";
    const attrs = stateObj.attributes;
    const pct: number = attrs.percentage ?? 0;
    const presetModes: string[] = attrs.preset_modes ?? [];
    const currentPreset: string | undefined = attrs.preset_mode;
    const oscillating: boolean = !!attrs.oscillating;
    const name =
      this._config.name ?? attrs.friendly_name ?? this._config.entity;

    const vEnt = this._companion(
      "vertical_oscillation",
      "switch",
      this._config.vertical_oscillation_entity
    );
    const timerEnt = this._companion("timer", "select", this._config.timer_entity);

    const vOn = vEnt ? this.hass.states[vEnt]?.state === "on" : false;
    const timerState = timerEnt ? this.hass.states[timerEnt]?.state : undefined;
    const timerOptions: string[] = timerEnt
      ? this.hass.states[timerEnt]?.attributes.options ?? []
      : [];

    return html`
      <ha-card style=${this._cardStyle()}>
        <div class="container">
          ${this._renderHeader(name, isOn, pct)}

          <div class="controls">
            ${this._config.show_presets && presetModes.length
              ? this._renderPresets(presetModes, currentPreset, isOn)
              : nothing}
            ${this._renderSecondRow(oscillating, vEnt, vOn, timerEnt, timerState, timerOptions, isOn)}
          </div>
        </div>
      </ha-card>
    `;
  }

  private _renderHeader(name: string, isOn: boolean, pct: number): TemplateResult {
    const icon = this._config.icon ?? "mdi:fan";
    return html`
      <div class="header">
        <button
          class="power-icon ${isOn ? "on" : "off"}"
          @click=${this._togglePower}
          title="Aan/uit"
        >
          <ha-icon
            icon=${icon}
            style=${isOn ? `animation-duration:${Math.max(0.4, 2.2 - pct / 60)}s` : ""}
            class=${isOn ? "spin" : ""}
          ></ha-icon>
        </button>
        <div class="header-main">
          ${this._config.show_name || this._config.show_percentage
            ? html`<div class="name" @click=${() => this._moreInfo(this._config.entity)}>
                ${this._config.show_name ? html`<span class="title">${name}</span>` : nothing}
                ${this._config.show_percentage
                  ? html`<span class="subtitle">${isOn ? `${Math.round(pct)}%` : "Uit"}</span>`
                  : nothing}
              </div>`
            : nothing}
          ${this._config.show_speed ? this._renderSpeed(pct, isOn) : nothing}
        </div>
      </div>
    `;
  }

  private _renderSpeed(pct: number, isOn: boolean): TemplateResult {
    return html`
      <div class="row speed-row">
        <ha-icon icon="mdi:speedometer-slow"></ha-icon>
        <input
          class="slider"
          type="range"
          min="0"
          max="100"
          step="1"
          .value=${String(pct)}
          ?disabled=${!isOn}
          @change=${this._setSpeed}
        />
        <ha-icon icon="mdi:speedometer"></ha-icon>
      </div>
    `;
  }

  private _renderPresets(
    modes: string[],
    current: string | undefined,
    isOn: boolean
  ): TemplateResult {
    return html`
      <div class="row presets even" style="grid-template-columns: repeat(${modes.length}, 1fr)">
        ${modes.map(
          (m) => html`
            <button
              class="chip even ${current === m && isOn ? "active" : ""}"
              ?disabled=${!isOn}
              @click=${() => this._setPreset(m)}
            >
              <ha-icon icon=${PRESET_ICONS[m] ?? "mdi:fan"}></ha-icon>
              <span>${this._presetLabel(m)}</span>
            </button>
          `
        )}
      </div>
    `;
  }

  private _renderSecondRow(
    oscillating: boolean,
    vEnt: string | undefined,
    vOn: boolean,
    timerEnt: string | undefined,
    timerCurrent: string | undefined,
    timerOptions: string[],
    isOn: boolean
  ): TemplateResult | typeof nothing {
    const showH = this._config.show_oscillation;
    const showV = this._config.show_vertical_oscillation && vEnt;
    const showTimer = this._config.show_timer && timerEnt;
    if (!showH && !showV && !showTimer) return nothing;
    const columnCount = [showH, showV, showTimer].filter(Boolean).length;

    return html`
      <div class="row second-row even" style="grid-template-columns: repeat(${columnCount}, 1fr)">
        ${showH
          ? html`<button
              class="chip even toggle ${oscillating ? "active" : ""}"
              ?disabled=${!isOn}
              @click=${() => this._toggleOscillation(oscillating)}
            >
              <ha-icon icon="mdi:arrow-left-right"></ha-icon>
              <span>Horizontaal</span>
            </button>`
          : nothing}
        ${showV
          ? html`<button
              class="chip even toggle ${vOn ? "active" : ""}"
              ?disabled=${!isOn}
              @click=${() => this._toggleVertical(vEnt!)}
            >
              <ha-icon icon="mdi:arrow-up-down"></ha-icon>
              <span>Verticaal</span>
            </button>`
          : nothing}
        ${showTimer
          ? html`<select
              class="timer-select even"
              ?disabled=${!isOn}
              @change=${(e: Event) =>
                this._setTimer(timerEnt!, (e.target as HTMLSelectElement).value)}
            >
              ${timerOptions.map(
                (o) =>
                  html`<option value=${o} ?selected=${o === timerCurrent}>
                    ${this._timerLabel(o)}
                  </option>`
              )}
            </select>`
          : nothing}
      </div>
    `;
  }

  private _presetLabel(s: string): string {
    return PRESET_LABELS_NL[s] ?? this._label(s);
  }

  private _label(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  private _timerLabel(o: string): string {
    return TIMER_LABELS_NL[o] ?? o;
  }

  /* ---------- dynamic style from config ---------- */

  private _cardStyle(): string {
    const c = this._config;
    const parts: string[] = [];
    if (c.show_background === false) {
      parts.push(`--duux-bg:transparent`);
      parts.push(`--duux-shadow-card:none`);
    } else {
      if (c.background) parts.push(`--duux-bg:${c.background}`);
      parts.push(`--duux-shadow-card:var(--ha-card-box-shadow, 0 2px 6px rgba(0,0,0,.2))`);
    }
    if (c.accent_color) parts.push(`--duux-accent:${c.accent_color}`);
    if (c.text_color) parts.push(`--duux-text:${c.text_color}`);
    if (c.secondary_text_color) parts.push(`--duux-text2:${c.secondary_text_color}`);
    if (c.icon_color) parts.push(`--duux-icon:${c.icon_color}`);
    if (c.border_radius) parts.push(`--duux-radius:${c.border_radius}`);
    if (c.font_weight) parts.push(`--duux-weight:${c.font_weight}`);
    if (c.text_shadow) parts.push(`--duux-shadow:${c.text_shadow}`);
    return parts.join(";");
  }

  static styles = css`
    :host {
      --duux-accent: var(--primary-color, #0a84ff);
      --duux-bg: var(--ha-card-background, var(--card-background-color, #1c1c1e));
      --duux-text: var(--primary-text-color, #fff);
      --duux-text2: var(--secondary-text-color, #9b9b9b);
      --duux-icon: var(--state-icon-color, #9b9b9b);
      --duux-radius: var(--ha-card-border-radius, 16px);
      --duux-weight: 500;
      --duux-shadow: none;
      --duux-shadow-card: var(--ha-card-box-shadow, 0 2px 6px rgba(0, 0, 0, 0.2));
    }
    ha-card {
      background: var(--duux-bg);
      border-radius: var(--duux-radius);
      padding: 16px;
      color: var(--duux-text);
      overflow: hidden;
      box-shadow: var(--duux-shadow-card);
    }
    .header {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 14px;
    }
    .header-main {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .power-icon {
      border: none;
      cursor: pointer;
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      border-radius: 50%;
      display: grid;
      place-items: center;
      background: rgba(127, 127, 127, 0.12);
      transition: background 0.25s, color 0.25s;
      color: var(--duux-icon);
    }
    .power-icon.on {
      background: color-mix(in srgb, var(--duux-accent) 22%, transparent);
      color: var(--duux-accent);
    }
    .power-icon ha-icon {
      --mdc-icon-size: 22px;
    }
    .power-icon ha-icon.spin {
      animation: spin linear infinite;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
    .name {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      line-height: 1.2;
    }
    .title {
      font-weight: var(--duux-weight);
      font-size: 1.05rem;
      color: var(--duux-text);
      text-shadow: var(--entity-text-shadow, none);
    }
    .subtitle {
      font-size: 0.85rem;
      color: var(--duux-text2);
      text-shadow: var(--entity-text-shadow, none);
    }
    .controls {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .row {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .row > ha-icon {
      color: var(--duux-icon);
      --mdc-icon-size: 20px;
      flex: 0 0 auto;
    }
    .slider {
      -webkit-appearance: none;
      appearance: none;
      flex: 1;
      height: 6px;
      border-radius: 3px;
      background: rgba(127, 127, 127, 0.25);
      outline: none;
    }
    .slider:disabled {
      opacity: 0.4;
    }
    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--duux-accent);
      cursor: pointer;
      border: 2px solid #fff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }
    .slider::-moz-range-thumb {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--duux-accent);
      cursor: pointer;
      border: 2px solid #fff;
    }
    .chip {
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 8px 12px;
      border-radius: 999px;
      background: rgba(127, 127, 127, 0.14);
      color: var(--primary-text-color, var(--duux-text));
      font-size: 0.85rem;
      font-weight: var(--duux-weight);
      text-shadow: var(--duux-shadow);
      transition: background 0.2s, color 0.2s;
      white-space: nowrap;
    }
    .chip ha-icon {
      --mdc-icon-size: 18px;
    }
    .chip:disabled {
      cursor: not-allowed;
      color: var(--disabled-text-color, rgba(127, 127, 127, 0.6));
    }
    .chip.active {
      background: var(--duux-accent);
      color: #fff;
    }
    .row.even {
      display: grid;
      gap: 8px;
    }
    .chip.even {
      min-width: 0;
      width: 100%;
    }
    .chip.even span {
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .timer-select {
      width: 100%;
      min-width: 0;
      padding: 8px 10px;
      border-radius: 999px;
      border: 1px solid rgba(127, 127, 127, 0.3);
      background: rgba(127, 127, 127, 0.08);
      color: var(--primary-text-color, var(--duux-text));
      font-size: 0.85rem;
      text-align: center;
      text-align-last: center;
    }
    .timer-select:disabled {
      cursor: not-allowed;
      color: var(--disabled-text-color, rgba(127, 127, 127, 0.6));
      -webkit-text-fill-color: var(--disabled-text-color, rgba(127, 127, 127, 0.6));
    }
    .warning {
      padding: 12px;
      color: var(--error-color, #db4437);
    }
  `;
}
