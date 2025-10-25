import { defineConfig, fontProviders } from "astro/config";
import { storyblok } from '@storyblok/astro';
import { loadEnv } from 'vite';
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import mkcert from "vite-plugin-mkcert";

const env = loadEnv(process.env.NODE_ENV || "", process.cwd(), 'STORYBLOK');
const isDev = import.meta.env.DEV;

// https://astro.build/config
export default defineConfig({
	site: "https://example.com",
	integrations: [icon(), sitemap(),     
        storyblok({
        accessToken: env.STORYBLOK_TOKEN,
        livePreview: isDev ? true : false,
        components: {
            block: "storyblok/Hero",
            block: "storyblok/HeroVideo",
            block: "storyblok/Features",
            block: "storyblok/FeaturedCars",
            block: "storyblok/FaqSection",
            block: "storyblok/ImageGrid",
        },
        enableFallbackComponent: isDev ? true : false,
        customFallbackComponent: 'storyblok/FallbackComponent',
        apiOptions: {
          region: 'eu', 
        },
      })],
	vite: {
    server: isDev ? {
      https: true,
    } : undefined,
		plugins: [tailwindcss(), mkcert()],
	},
  output: isDev ? 'server' : 'static',
	experimental: {
        fonts: [{
            provider: fontProviders.google(),
            name: "Poppins",
            cssVariable: "--font-poppins",
            weights:["100 800"]
        }]
    }
});
