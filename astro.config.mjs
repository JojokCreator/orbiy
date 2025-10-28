import { defineConfig } from "astro/config";
import { storyblok } from '@storyblok/astro';
import { loadEnv } from 'vite';
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import mkcert from "vite-plugin-mkcert";

import netlify from "@astrojs/netlify";

const env = loadEnv(process.env.NODE_ENV || "", process.cwd(), 'STORYBLOK');
const isLocal = env.STORYBLOK_LOCAL === 'yes'
const isPreview = isLocal ? true : env.STORYBLOK_PREVIEW === 'yes'

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  image: {
      domains: ['a.storyblok.com'],
	},
  integrations: [icon(), sitemap(),
      storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      livePreview: isPreview ? true : false,
      components: {
          block: "storyblok/Hero",
          block: "storyblok/HeroVideo",
          block: "storyblok/Features",
          block: "storyblok/FeaturedCars",
          block: "storyblok/AllCars",
          block: "storyblok/FaqSection",
          block: "storyblok/ImageGrid",
          block: "storyblok/ImageText",
          block: "storyblok/Process",
          block: "storyblok/Contact",
          block: "storyblok/CountDown",
          countdown_feature: "storyblok/CountDownFeature",
      },
      enableFallbackComponent: isPreview ? true : false,
      customFallbackComponent: 'storyblok/FallbackComponent',
      apiOptions: {
        region: 'eu',
      },
    })],
  adapter: isPreview ? netlify() : undefined,
  vite: {
  server: isLocal ? {
    https: true,
  } : undefined,
      plugins: [tailwindcss(), mkcert()],
	},
  output: isPreview ? 'server' : 'static',
  experimental: {
      fonts: [
          {
              provider: "local",
              name: "Solomon Sans",
              cssVariable: "--font-heading",
              variants: [
                  {
                      weight: 400,
                      style: "normal",
                      src: ["./src/assets/fonts/SolomonSans-Medium.woff2"]
                  },
                  {
                      weight: 500,
                      style: "normal",
                      src: ["./src/assets/fonts/SolomonSans-SemiBold.woff2"]
                  },
              ]
          },
          {
              provider: "local",
              name: "TT Interphases Pro",
              cssVariable: "--font-sans",
              variants: [
                  {
                      weight: "100 900",
                      style: "normal",
                      src: ["./src/assets/fonts/TT-Interphases-Pro-Trl-Variable.woff2"]
                  }
              ]
          }
      ]
	}
});