import { defineConfig, fontProviders } from "astro/config";
import { storyblok } from '@storyblok/astro';
import { loadEnv } from 'vite';
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import mkcert from "vite-plugin-mkcert";

const env = loadEnv("", process.cwd(), 'STORYBLOK');

// https://astro.build/config
export default defineConfig({
	site: "https://example.com",
	integrations: [icon(), sitemap(),     
        storyblok({
        accessToken: env.STORYBLOK_TOKEN,
        livePreview: true,
        components: {
            block: "storyblok/Hero",
            block: "storyblok/Features",
            block: "storyblok/FeaturedCars",
            block: "storyblok/FaqSection",
        },
        apiOptions: {
          // Choose your Storyblok space region
          region: 'eu', // optional,  or 'eu' (default)
        },
      })],
	vite: {
    server: {
      https: true,
    },
		plugins: [tailwindcss(), mkcert()],
	},
  output: 'server',
	experimental: {
        fonts: [{
            provider: fontProviders.google(),
            name: "Poppins",
            cssVariable: "--font-poppins",
            weights:["100 800"]
        }]
    }
});
