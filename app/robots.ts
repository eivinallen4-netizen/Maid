import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/about",
          "/services",
          "/pricing",
          "/faq",
          "/how-it-works",
          "/service-areas",
        ],
        disallow: ["/admin", "/api", "/account", "/portal-quote", "/rep", "/stats", "/signin"],
      },
    ],
    sitemap: "https://mountainspringsclean.com/sitemap.xml",
  };
}
