import type { APIRoute } from "astro";

const isPreview = import.meta.env.STORYBLOK_PREVIEW === "yes";

const productionRobotsTxt = `
User-agent: *
Allow: /

Sitemap: ${new URL("sitemap-index.xml", import.meta.env.SITE).href}
`.trim();

const previewRobotsTxt = `
User-agent: *
Disallow: /
`.trim();

export const GET: APIRoute = () => {
  const content = isPreview ? previewRobotsTxt : productionRobotsTxt;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
