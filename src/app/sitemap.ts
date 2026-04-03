import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const LAST_UPDATE = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}`,
      lastModified: LAST_UPDATE,
      changeFrequency: "monthly",
      priority: 1.0
    }
  ];
}
