"use client";

import { useEffect, useState } from "react";

/** Null on the server and first paint, so live values never cause a hydration mismatch. */
export function useNow(intervalMs = 1000): Date | null {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return now;
}

export function secondsSince(start: Date, now: Date): number {
  return Math.max(0, Math.floor((now.getTime() - start.getTime()) / 1000));
}

export function secondsUntilNext(target: { hours: number; minutes: number }, now: Date): number {
  const next = new Date(now);
  next.setHours(target.hours, target.minutes, 0, 0);
  if (next.getTime() <= now.getTime()) next.setDate(next.getDate() + 1);
  return Math.ceil((next.getTime() - now.getTime()) / 1000);
}

export function daysUntil(target: { month: number; day: number }, now: Date): number {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let next = new Date(now.getFullYear(), target.month, target.day);
  if (next < today) next = new Date(now.getFullYear() + 1, target.month, target.day);
  return Math.round((next.getTime() - today.getTime()) / 86400000);
}
