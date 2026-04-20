import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
// En GitHub Actions se define BASE_PATH=/nombre-repo/ para project pages.
// En local, base queda en "/" (ver script "build:pages" si quieres probar la subruta).
export default defineConfig({
	base: process.env.BASE_PATH || "/",
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
