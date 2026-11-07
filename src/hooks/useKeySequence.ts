"use client";

import { useEffect, useRef } from "react";
import { KEY_SEQUENCE_TIMEOUT_MS } from "@/lib/constants";

export function useKeySequence(sequence: string, onMatch: () => void): void {
  const handler = useRef(onMatch);

  useEffect(() => {
    handler.current = onMatch;
  }, [onMatch]);

  useEffect(() => {
    let buffer = "";
    let timer: ReturnType<typeof setTimeout> | undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.length !== 1 || event.metaKey || event.ctrlKey) return;
      buffer = (buffer + event.key).slice(-sequence.length);
      clearTimeout(timer);
      timer = setTimeout(() => {
        buffer = "";
      }, KEY_SEQUENCE_TIMEOUT_MS);
      if (buffer === sequence) {
        buffer = "";
        handler.current();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      clearTimeout(timer);
    };
  }, [sequence]);
}
