<script setup>
import { images } from "@/shared/data.json" with { type: "json" }

// oxlint-disable-next-line vue/max-props
let props = defineProps({
	"name": {
		type: String,
		required: true,
	},
	"alt": {
		"type": String,
		"default": ``,
	},
	"class": {
		"type": String,
		"default": ``,
	},
	"loading": {
		"type": String,
		"default": `lazy`,
	},
	"decoding": {
		"type": String,
		"default": `async`,
	},
})

let { name, alt, class: classList, loading, decoding } = props
let { maxDensity, sizes, formats } = images[name]

function isTagImg (formatIndex, sizeIndex) {
	let isLastFormat = formatIndex === formats.length - 1
	let isLastSize = sizeIndex === sizes.length - 1

	return isLastFormat && isLastSize
}

function getSrcValue (imageName, breakpoint, format) {
	return `/images/${imageName}${breakpoint ? `~` : ``}${breakpoint}@1x.${format}`
}

function getSrcsetValue (imageName, breakpoint, format, isImg) {
	let srcset = ``

	for (let density = maxDensity; density !== 0; density -= 1) {
		if (isImg && density === 1) continue

		let sourceName = `${imageName}${breakpoint ? `~` : ``}${breakpoint}@${density}x`
		let destPath = `/images/${sourceName}.${format}`
		let descriptor = density === 1 ? `` : ` ${density}x`

		srcset += `${srcset ? `, ` : ``}${destPath}${descriptor}`
	}

	return srcset
}
</script>

<template>
	<picture v-if="sizes.length">
		<template v-for="(format, formatIndex) in formats" :key="formatIndex">
			<template v-for="({ breakpoint = '', width, height }, sizeIndex) in sizes" :key="sizeIndex">
				<img
					v-if="isTagImg(formatIndex, sizeIndex)"
					:class="classList"
					:src="getSrcValue(name, breakpoint, format)"
					:srcset="getSrcsetValue(name, breakpoint, format, () => isTagImg(formatIndex, sizeIndex))"
					:width
					:height
					:loading
					:decoding
					:alt
				>
				<source
					v-else
					:srcset="getSrcsetValue(name, breakpoint, format)"
					:type="`image/${format}`"
					:width
					:height
					:media="breakpoint ? `(width <= ${breakpoint}px)` : undefined"
				>
			</template>
		</template>
	</picture>
</template>
