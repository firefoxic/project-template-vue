import { readFileSync } from "node:fs"
import { fileURLToPath, URL } from "node:url"

import { getProjectRoot } from "@firefoxic/utils"
import vue from "@vitejs/plugin-vue"
import browserslist from "browserslist"
import browserslistToEsbuild from "browserslist-to-esbuild"
import { browserslistToTargets } from "lightningcss"
import { defineConfig } from "vite"

let queries = readFileSync(`./.browserslistrc`, `utf8`)
	.split(`\n`)
	.filter((line) => line !== `` || line.startsWith(`#`))
	.join(`,`)
let targets = browserslistToTargets(browserslist(queries))

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
		cssMinify: undefined,
		target: browserslistToEsbuild(),
	},
	css: {
		lightningcss: {
			cssModules: true,
			minify: false,
			targets,
		},
		transformer: `lightningcss`,
	},
	clearScreen: false,
})
