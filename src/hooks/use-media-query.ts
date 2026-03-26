"use client";

import { useSyncExternalStore } from "react";

interface Entry {
  subscribers: Set<() => void>;
  lastMatch: boolean;
  cleanup: () => void;
}

const store = new Map<string, Entry>();

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (subscriber) => {
      if (typeof window === "undefined") return () => {};

      let entry = store.get(query) as Entry;

      if (!entry) {
        const mql = window.matchMedia(query);
        const onChange = () => {
          if (mql.matches === entry.lastMatch) return;
          entry.lastMatch = mql.matches;
          entry.subscribers.forEach((sb) => {
            sb();
          });
        };

        mql.addEventListener("change", onChange);

        entry = {
          subscribers: new Set(),
          lastMatch: mql.matches,
          cleanup: () => mql.removeEventListener("change", onChange)
        };

        store.set(query, entry);
      }

      entry.subscribers.add(subscriber);

      return () => {
        entry.subscribers.delete(subscriber);
        if (entry.subscribers.size === 0) {
          entry.cleanup();
          store.delete(query);
        }
      };
    },
    () => store.get(query)?.lastMatch ?? false,
    () => false
  );
}
