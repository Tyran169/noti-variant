"use client";

import {
  CircleCheckIcon,
  CircleEllipsisIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { Toaster as Sonner, type ToasterProps, useSonner } from "sonner";
import "@/styles/sonner.css";

const toastOptions: NonNullable<ToasterProps["toastOptions"]> = {
  classNames: {
    toast: "cn-toast rst-toast",
    success: "rst-success",
    info: "rst-info",
    warning: "rst-warning",
    error: "rst-error",
    loading: "rst-loading",
    closeButton: "rst-close-btn",
    actionButton: "rst-action-btn",
    cancelButton: "rst-cancel-btn",
    content: "rst-content",
    title: "rst-title",
    description: "rst-description",
    icon: "rst-icon"
  }
};

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group rst-toaster"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)"
        } as React.CSSProperties
      }
      toastOptions={toastOptions}
      visibleToasts={6}
      duration={5000}
      {...props}
    />
  );
};

const SONNER_ICON_SUPPORTED_TYPES = new Set<
  NonNullable<ReturnType<typeof useSonner>["toasts"][number]["type"]>
>(["success", "info", "warning", "error", "loading"]);

/**
 * - Mutates Sonner toast objects (idempotent) to add a default icon
 * - when no icon/jsx is provided and the type has no built-in icon.
 */
function EnsureDefaultIcon() {
  const { toasts } = useSonner();

  useEffect(() => {
    toasts.forEach((toast) => {
      if (
        toast.type !== undefined &&
        SONNER_ICON_SUPPORTED_TYPES.has(toast.type)
      )
        return;
      if (toast.icon !== undefined) return;
      if (toast.jsx !== undefined) return;

      toast.icon = <CircleEllipsisIcon className="size-4" />;
    });
  }, [toasts]);

  return null;
}

export { Toaster, EnsureDefaultIcon };
