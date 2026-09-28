// Minimal Home Assistant types and helpers used by this card.
// Replaces the (unmaintained) custom-card-helpers package.

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>
  ): Promise<unknown>;
}

export interface LovelaceCardConfig {
  type: string;
  [key: string]: any;
}

export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: LovelaceCardConfig): void;
}

// Dispatch an event that Home Assistant's frontend listens for
// (e.g. "hass-more-info", "config-changed").
export const fireEvent = (
  node: HTMLElement,
  type: string,
  detail: Record<string, unknown>
): void => {
  node.dispatchEvent(
    new CustomEvent(type, { detail, bubbles: true, composed: true })
  );
};
