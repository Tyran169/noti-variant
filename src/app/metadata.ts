import type { Metadata } from "next";
import { preload } from "react-dom";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const rootMetadata: Metadata = {
  title: "Shadcn Notification Variants",
  description:
    "A showcase of custom variants for the Sonner and Alert - notification components of Shadcn/ui, built with Next.js and Tailwind CSS.",
  metadataBase: new URL(SITE_URL),
  keywords: [
    "react",
    "reactjs",
    "next",
    "nextjs",
    "css",
    "tailwind",
    "tailwindcss",
    "tailwind css",
    "sonner",
    "shadcn",
    "shadcn/ui",
    "toast",
    "toasts",
    "snackbar",
    "snackbars",
    "alert",
    "alerts",
    "notification",
    "notifications",
    "web",
    "library",
    "ui",
    "user-interface",
    "component",
    "components",
    "open-source",
    "opensource",
    "open source",
    "showcase",
    "demo",
    "example",
    "variants",
    "custom-variants",
    "styling",
    "themes",
    "dark-mode",
    "light-mode",
    "system-theme"
  ],
  appleWebApp: {
    title: "Noti Variants",
    capable: true
  },
  openGraph: {
    title: "Shadcn Notification Variants",
    description:
      "A showcase of custom variants for the Sonner and Alert - notification components of Shadcn/ui, built with Next.js and Tailwind CSS.",
    siteName: "Shadcn Notification Variants",
    url: "/",
    type: "website",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "Site Preview Image",
        type: "image/png"
      }
    ]
  },
  icons: [
    {
      rel: "icon",
      url: "/logos/favicon.ico",
      sizes: "48x48",
      type: "image/x-icon"
    },
    {
      rel: "icon",
      url: "/logos/logo.svg",
      sizes: "any",
      type: "image/svg+xml"
    },
    {
      rel: "icon",
      url: "/logos/icon-16x16.png",
      sizes: "16x16",
      type: "image/png"
    },
    {
      rel: "icon",
      url: "/logos/icon-32x32.png",
      sizes: "32x32",
      type: "image/png"
    },
    {
      rel: "icon",
      url: "/logos/icon-48x48.png",
      sizes: "48x48",
      type: "image/png"
    },
    {
      rel: "icon",
      url: "/logos/icon-64x64.png",
      sizes: "64x64",
      type: "image/png"
    },
    {
      rel: "icon",
      url: "/logos/icon-96x96.png",
      sizes: "96x96",
      type: "image/png"
    },
    {
      rel: "apple-touch-icon",
      url: "/logos/apple-icon.png",
      sizes: "180x180",
      type: "image/png"
    }
  ]
};

export function preLoadResources() {
  preload("/logos/logo.webp", {
    as: "image",
    type: "image/webp",
    fetchPriority: "high"
  });
}
