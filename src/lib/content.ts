export const TYPEWRITER_LINES = [
  "lighting the first diya…",
  "seconds since 10 July: ",
  "08·12 and 13·07, side by side",
] as const;
export const LIVE_LINE_INDEX = 1;

export const MEMORIES = [
  { title: "10 July", caption: "A day I did not know would become a date I'd never forget." },
  { title: "The date", caption: "I was nervous. You laughed, and I stopped being nervous." },
  { title: "Coffee", caption: "It went cold. We kept talking. I'd order it cold forever." },
  { title: "The movie", caption: "I barely remember the film. I remember you beside me." },
  { title: "Ordinary hours", caption: "Hours spent doing nothing, which turned out to be everything." },
  { title: "When it got heavy", caption: "Life got harder for you. I couldn't fix it, so I stayed, and kept trying." },
] as const;

export const ADJECTIVES = [
  "care", "respect", "reverence", "glory", "affection", "patience", "gentleness",
  "devotion", "effort", "warmth", "trust", "honour", "tenderness", "loyalty",
  "laughter", "safety", "time", "देखभाल", "आदर", "स्नेह", "श्रद्धा", "धैर्य",
  "प्रेम", "सम्मान", "अपनापन", "cherished", "every day", "आभार",
] as const;
export const CENTER_WORD = "cherished";

export const MINUTE_LINES = [
  "There is a minute I keep returning to.",
  "Eight twelve. The one the world got you.",
  "I can't give you everything you deserve.",
  "So I give what I have: my time, my patience, my care.",
  "All of it, lit for you.",
] as const;

export const DIYAS = [
  { title: "Care", line: "On your heavy days, I'll be the one asking if you've eaten." },
  { title: "Respect", line: "Your pace, your silence, your no. All of it is yours." },
  { title: "Reverence", line: "I look at you the way people look at a lit lamp: carefully, so it never goes out." },
  { title: "Patience", line: "I'm in no hurry. Healing keeps no schedule." },
  { title: "Love", line: "It doesn't need a future or a name for me to mean it." },
] as const;

export const HERO_STARS = [
  { id: "nans", label: "Nans", x: 0.22, y: 0.3, note: "The brightest thing in any room. Placeholder note." },
  { id: "an", label: "Anku", x: 0.78, y: 0.26, note: "Still learning how to say it properly. Placeholder note." },
  { id: "us", label: "us", x: 0.5, y: 0.52, note: "Somewhere between two numbers. Placeholder note." },
  { id: "0812", label: "08.12", x: 0.14, y: 0.68, note: "Your day. Placeholder note." },
  { id: "1307", label: "13.07", x: 0.86, y: 0.7, note: "Mine, three days after I met you. Placeholder note." },
  { id: "beginning", label: "10 July", x: 0.36, y: 0.82, note: "Where the map starts. Placeholder note." },
  { id: "rest", label: "the days we have", x: 0.68, y: 0.12, note: "I want them to be good ones. Placeholder note." },
] as const;

export const LETTERS = [
  {
    title: "For the heavy days",
    opening: "You don't have to explain it.",
    body: "Some days the world is too much, and you go quiet. I won't ask you to be okay. I'll sit with you, bring tea, and wait. You never owe me a smile.",
    rotate: -2,
  },
  {
    title: "For what I can't promise",
    opening: "I know where this can't go.",
    body: "I won't pretend otherwise, and I won't ask you to. I'm not here for a future you can't give. I'm here for the days we have, and I want them to be good ones.",
    rotate: 1.5,
  },
  {
    title: "For Diwali night",
    opening: "May your home be lit.",
    body: "May every worry you carry go out like a spent match, and every light you've given others find its way back to you. Happy Diwali, Nans. I'm glad it's you I'm lighting this for.",
    rotate: -1,
  },
] as const;
