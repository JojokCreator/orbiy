import { defineConfig, fontProviders } from "astro/config";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	site: "https://example.com",
	integrations: [icon(), sitemap()],
	vite: {
		plugins: [tailwindcss()],
	},
	experimental: {
        fonts: [{
            provider: fontProviders.google(),
            name: "Poppins",
            cssVariable: "--font-poppins"
        }]
    }
});
