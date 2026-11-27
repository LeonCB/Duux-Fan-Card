// Minimal Home Assistant types and helpers used by this card.
// Replaces the (unmaintained) custom-card-helpers package.

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
}

// A card name: fixed text, or parts that Home Assistant puts together
// (the same as the name picker of the built-in cards).
export type EntityNameItem =
  | { type: "floor" | "area" | "parent_device" | "device" | "entity" }
  | { type: "text"; text: string };

export type EntityName = string | EntityNameItem | EntityNameItem[];

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  config: { version: string };
  // Registries; replaced by the frontend only when they change
  entities?: Record<string, unknown>;
  devices?: Record<string, unknown>;
  areas?: Record<string, unknown>;
  floors?: Record<string, unknown>;
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>
  ): Promise<unknown>;
  // Home Assistant 2025.10 and newer
  formatEntityName?(
    stateObj: HassEntity,
    name?: EntityName,
    options?: { separator?: string }
  ): string;
}

// True when the running Home Assistant is at least year.month
export const haAtLeast = (hass: HomeAssistant | undefined, year: number, month: number): boolean => {
  const m = hass?.config?.version?.match(/^(\d+)\.(\d+)/);
  if (!m) return false;
  const [y, mo] = [Number(m[1]), Number(m[2])];
  return y > year || (y === year && mo >= month);
};

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
