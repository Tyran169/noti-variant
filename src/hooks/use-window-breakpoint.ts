"use client";
import { useSyncExternalStore } from "react";

export type Breakpoint = "mobile" | "tablet" | "desktop" | "large-desktop";

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;
const DESKTOP_BREAKPOINT = 1440;

const DEFAULT_BREAKPOINT: Breakpoint = "desktop";

class BreakpointManager {
  private subscribers = new Set<() => void>();
  private listening = false;
  private rafId: number | null = null;

  private savedBreakpoint: Breakpoint =
    typeof window === "undefined"
      ? DEFAULT_BREAKPOINT
      : this.getBreakpoint(window.innerWidth);

  private getBreakpoint(width: number): Breakpoint {
    if (width < MOBILE_BREAKPOINT) return "mobile";
    if (width < TABLET_BREAKPOINT) return "tablet";
    if (width < DESKTOP_BREAKPOINT) return "desktop";
    return "large-desktop";
  }

  private onResize = () => {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);

    this.rafId = requestAnimationFrame(() => {
      const currentBreakpoint = this.getBreakpoint(window.innerWidth);

      if (currentBreakpoint !== this.savedBreakpoint) {
        this.savedBreakpoint = currentBreakpoint;
        this.subscribers.forEach((sb) => {
          sb();
        });
      }

      this.rafId = null;
    });
  };

  private ensureListener() {
    if (!this.listening) {
      window.addEventListener("resize", this.onResize);
      this.listening = true;
    }
  }

  private cleanupListener() {
    if (this.listening && this.subscribers.size === 0) {
      window.removeEventListener("resize", this.onResize);
      this.listening = false;
    }
  }

  subscribe = (sb: () => void) => {
    if (typeof window === "undefined") return () => {};

    this.subscribers.add(sb);
    this.ensureListener();
    return () => {
      this.subscribers.delete(sb);
      this.cleanupListener();
    };
  };

  getSnapshot = () => this.savedBreakpoint;
}

const bpManager = new BreakpointManager();

export function useWindowBreakpoint(): Breakpoint {
  return useSyncExternalStore(
    bpManager.subscribe,
    bpManager.getSnapshot,
    () => DEFAULT_BREAKPOINT
  );
}
