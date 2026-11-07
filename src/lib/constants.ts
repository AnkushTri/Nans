export const NANS_NUMBER = "0812" as const;
export const AN_NUMBER = "1307" as const;

/** Set to the moment you first met (local time). */
export const START_DATE = new Date("2026-07-10T00:00:00");

export const NANS_TIME = { hours: 8, minutes: 12 } as const;
export const AN_TIME = { hours: 13, minutes: 7 } as const;
export const HEARTBEAT_MS = { nans: 812, an: 1307 } as const;

export const ACCENT_COLORS = {
  rose: "#B3202A",
  peach: "#F5A623",
  lavender: "#8A2D5B",
  gold: "#E8B04B",
  paper: "#FFF3DC",
  ink: "#2A0E10",
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

/** Month is zero-based (11 = December, 6 = July). */
export const NANS_BIRTHDAY = { month: 11, day: 8 } as const;
export const AN_BIRTHDAY = { month: 6, day: 13 } as const;
export const PHOTO_COUNT = 6;
