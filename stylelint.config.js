/** @type {import('stylelint').Config} */
export default {
	"extends": [
		`@firefoxic/stylelint-config`,
		`stylelint-config-html/vue`,
	],
	"rules": {
		"declaration-property-value-no-unknown": [
			true,
			{
				typesSyntax: {
					color: `| oklch( [ <percentage> | <number> | none] [ <percentage> | <number> | none] [ <hue> | none] [ / [<alpha-value> | none] ]? )`,
				},
			},
		],
		"number-max-precision": null,
	},
}
