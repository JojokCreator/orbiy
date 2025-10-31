import { defineConfig, fontProviders } from "astro/config";
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
  site: "https://orbiy.netlify.app",
  image: {
      domains: ['a.storyblok.com'],
	},
  integrations: [icon(), sitemap(),
      storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      livePreview: isPreview ? true : false,
      components: {
          Hero: "storyblok/Hero",
          HeroVideo: "storyblok/HeroVideo",
          Features: "storyblok/Features",
          FeaturedCars: "storyblok/FeaturedCars",
          AllCars: "storyblok/AllCars",
          FaqSection: "storyblok/FaqSection",
          ImageGrid: "storyblok/ImageGrid",
          ImageText: "storyblok/ImageText",
          Process: "storyblok/Process",
          Contact: "storyblok/Contact",
          CountDown: "storyblok/CountDown",
          TextContent: "storyblok/TextContent",
      },
      enableFallbackComponent: isPreview ? true : false,
      customFallbackComponent: 'storyblok/FallbackComponent',
      apiOptions: {
        region: 'eu',
      },
    })],
  adapter: isPreview && !isLocal ? netlify() : undefined,
  vite: {
      plugins: [tailwindcss(), mkcert()],
	},
  output: isPreview ? 'server' : 'static',
  experimental: {
      fonts: [
          {
              provider: "local",
              name: "Ambiguity Normate",
              cssVariable: "--font-heading",
              variants: [
                {
                  weight: 400,
                  style: "normal",
                  src: [
                    "./src/assets/fonts/AmbiguityNormate-Regular.woff2",
                    "./src/assets/fonts/AmbiguityNormate-Regular.woff"
                  ]
                },
                {
                  weight: 500,
                  style: "normal",
                  src: [
                    "./src/assets/fonts/AmbiguityNormate-SemiBold.woff2",
                    "./src/assets/fonts/AmbiguityNormate-SemiBold.woff"
                  ]
                }
              ]
          },
          {
              provider: fontProviders.fontsource(),
              name: "Open Sans",
              cssVariable: "--font-sans",
              weights: ["100 900"],
              subsets: ["latin"]
          }
      ]
	}
});