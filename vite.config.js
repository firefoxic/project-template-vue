import { fileURLToPath, URL } from "node:url"

import browserslistToEsbuild from "browserslist-to-esbuild"
import { defineConfig } from "vite"
import { getProjectRoot } from "@firefoxic/utils"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
	base: getProjectRoot(),
	plugins: [vue()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL(`./src`, import.meta.url)),
		},
	},
	build: {
		assetsInlineLimit: 0,
		cssMinify: undefined,
		target: browserslistToEsbuild(),
	},
	css: {
		transformer: `postcss`,
	},
	clearScreen: false,
})
