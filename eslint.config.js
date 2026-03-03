import { default as firefoxicEslintConfig, globals } from "@firefoxic/eslint-config"
import eslintPluginVue from "eslint-plugin-vue"

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		ignores: [
			`dist/`,
			`src/shared/vendor/`,
		],
	},
	{
		ignores: [`src/`],
		languageOptions: {
			globals: {
				...globals.nodeBuiltin,
			},
		},
	},
	{
		files: [`src/**/*.{js,vue}`],
		languageOptions: {
			globals: {
				...globals.browser,
			},
		},
	},
	{
		files: [`src/**/*.vue`],
		languageOptions: {
			globals: {
				...globals.nodeBuiltin,
			},
		},
	},
	...firefoxicEslintConfig,
	...eslintPluginVue.configs[`flat/recommended`],
	{
		rules: {
			"no-irregular-whitespace": `off`,
			"@stylistic/semi": [
				`error`,
				`never`,
				{ beforeStatementContinuationChars: `any` },
			],
			"vue/max-attributes-per-line": [
				`error`,
				{
					singleline: {
						max: 999,
					},
					multiline: {
						max: 1,
					},
				},
			],
			"vue/html-indent": [
				`error`,
				`tab`,
				{
					attribute: 1,
					baseIndent: 1,
					closeBracket: 0,
					alignAttributesVertically: true,
					ignores: [],
				},
			],
			"vue/html-self-closing": [
				`error`,
				{
					html: {
						"void": `never`,
						"normal": `never`,
						"component": `never`,
					},
					svg: `always`,
					math: `always`,
				},
			],
		},
	},
]
