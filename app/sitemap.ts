import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "http://localhost:3000";

  return [
    { url: `${baseUrl}/dashboard`, lastModified: new Date() },
    { url: `${baseUrl}/analytics`, lastModified: new Date() },
    { url: `${baseUrl}/users`, lastModified: new Date() },
    { url: `${baseUrl}/products`, lastModified: new Date() },
    { url: `${baseUrl}/orders`, lastModified: new Date() },
    { url: `${baseUrl}/settings`, lastModified: new Date() },
  ];
}
