import type { MetadataRoute } from "next";

// Single-page site: the home page is the only public, indexable URL.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.mj.eng.br/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
