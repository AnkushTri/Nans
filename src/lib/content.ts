export const TYPEWRITER_LINES = [
  "loading devotion…",
  "seconds since I started loving you: ",
  "08:12 saved forever",
] as const;
export const LIVE_LINE_INDEX = 1;

export const MEMORIES = [
  { title: "The first hello", caption: "You said something small. I have been replaying it since." },
  { title: "The long walk", caption: "We missed the turn and neither of us minded." },
  { title: "Rain, again", caption: "Your laugh made the weather irrelevant." },
  { title: "The quiet table", caption: "Nothing happened. It was my favorite evening." },
  { title: "Somewhere new", caption: "Every map I like now has you in the margin." },
] as const;

export const ADJECTIVES = [
  "kind", "fierce", "warm", "patient", "funny", "stubborn-in-the-best-way",
  "gentle", "brave", "bright", "steady", "curious", "generous", "graceful",
  "honest", "thoughtful", "radiant", "tender", "wise", "playful", "grounded",
  "loved", "magnetic", "calm", "bold", "soft", "clever", "loyal", "luminous",
] as const;
export const CENTER_WORD = "loved";

export const MINUTE_LINES = [
  "There is a minute I keep returning to.",
  "Nothing in it is loud.",
  "You are simply there, and the room rearranges itself around that.",
  "I did not know a number could feel like a place.",
  "Now it does.",
] as const;

export const HERO_STARS = [
  { id: "nans", label: "Nans", x: 0.22, y: 0.3, note: "The brightest thing in any room. Placeholder note." },
  { id: "an", label: "An", x: 0.78, y: 0.26, note: "Still learning how to say it properly. Placeholder note." },
  { id: "us", label: "us", x: 0.5, y: 0.52, note: "Somewhere between two numbers. Placeholder note." },
  { id: "0812", label: "08.12", x: 0.14, y: 0.68, note: "Your number. Placeholder note." },
  { id: "1307", label: "13.07", x: 0.86, y: 0.7, note: "Mine. Placeholder note." },
  { id: "beginning", label: "the beginning", x: 0.36, y: 0.82, note: "Where the map starts. Placeholder note." },
  { id: "rest", label: "the rest of our lives", x: 0.68, y: 0.12, note: "Not drawn yet. Placeholder note." },
] as const;

export const LETTERS = [
  {
    title: "For the days I'm quiet",
    opening: "If I go silent, it is not distance.",
    body: "It is me sitting in the same room as my thoughts, and every one of them eventually walks over to you. Wait for me. I always arrive.",
    rotate: -2,
  },
  {
    title: "For the days you're tired",
    opening: "Put the day down for a minute.",
    body: "You carry more than you admit. Let me hold one end of it. Nothing needs solving tonight; you only need to rest.",
    rotate: 1.5,
  },
  {
    title: "For always",
    opening: "I would choose this again.",
    body: "The ordinary days most of all. The tea going cold, the half-finished sentences, the way you say my name like it is easy.",
    rotate: -1,
  },
] as const;
