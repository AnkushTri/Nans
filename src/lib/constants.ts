export const NANS_NUMBER = "0812" as const;
export const AN_NUMBER = "1307" as const;

/** Set to the moment you first met (local time). */
export const START_DATE = new Date("2026-07-10T10:00:00");

export const NANS_TIME = { hours: 8, minutes: 12 } as const;
export const AN_TIME = { hours: 13, minutes: 7 } as const;
export const HEARTBEAT_MS = { nans: 812, an: 1307 } as const;

export const ACCENT_COLORS = {
  rose: "#C9485B",
  peach: "#E8A87C",
  lavender: "#7B6CB6",
  gold: "#D4A24C",
  paper: "#FBF7F2",
  ink: "#1A1410",
} as const;

export const SEEDS = { nans: 812, an: 1307 } as const;
export const STAR_COUNT = 42;
export const STAR_CONNECT_RADIUS = 150;
export const HERO_TITLE_STAGGER_S = 0.06;
export const KEY_SEQUENCE_TIMEOUT_MS = 2000;
export const TYPEWRITER_MS = { type: 55, erase: 25, hold: 2200, gap: 300 } as const;
export const CONFETTI_COUNT = 36;
export const BURST_MS = 3400;
export const HEART_MS = 2400;
export const MINUTE_RING_PROGRESS = 0.812;
export const CLOCK_ANGLES = { hour: 246, minute: 72 } as const;
