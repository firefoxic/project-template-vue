<script setup>
import { onMounted, ref } from 'vue'

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
})

let name = props.name
let alt = props.alt
let classList = props.class

let formats = ref([])
let sizes = ref([])
let maxDensity = ref(1)
let dests = ref([])

function isLastFormat (index) {
	return index === formats.value.length - 1
}

function isLastSize (index) {
	return index === sizes.value.length - 1
}

function getImageSrc (imageName, breakpoint, format) {
	let sourceName = `${imageName}${breakpoint ? `-` : ``}${breakpoint}@1x`

	return dests.value.find((path) => path.includes(sourceName) && path.endsWith(format))
}

function getImageSrcset (imageName, breakpoint, format) {
	let srcset = ``

	for (let density = maxDensity.value; density !== 0; density--) {
		let sourceName = `${imageName}${breakpoint ? `-` : ``}${breakpoint}@${density}x`
		let destPath = dests.value.find((path) => path.includes(sourceName) && path.endsWith(format))
		let descriptor = density !== 1 ? ` ${density}x` : ``

		srcset += `${srcset ? `, ` : ``}${destPath}${descriptor}`
	}

	return srcset
}

onMounted(async () => {
	let imageData = await import(`../shared/images/${name}.js`).then((m) => m.default)

	formats.value = imageData.formats
	sizes.value = imageData.sizes
	maxDensity.value = imageData.maxDensity

	dests.value = await Promise.all(
		imageData.paths.map(async (path) => {
			let module

			if (path.endsWith(`.avif`)) {
				module = await import(`../shared/images/${path.slice(2, -5)}.avif`)
			}

			if (path.endsWith(`.webp`)) {
				module = await import(`../shared/images/${path.slice(2, -5)}.webp`)
			}

			return module.default
		}),
	)
})
</script>

<template>
	<picture v-if="dests.length">
		<template v-for="(format, formatIndex) in formats" :key="formatIndex">
			<template v-for="({ breakpoint = '', width, height }, sizeIndex) in sizes" :key="sizeIndex">
				<img
					v-if="isLastFormat(formatIndex) && isLastSize(sizeIndex)"
					:class="classList"
					:src="getImageSrc(name, breakpoint, format)"
					:srcset="getImageSrcset(name, breakpoint, format)"
					:width="width"
					:height="height"
					:alt="alt || ''"
				>
				<source
					v-else
					:srcset="getImageSrcset(name, breakpoint, format)"
					:type="`image/${format}`"
					:width="width"
					:height="height"
					:media="breakpoint ? `(width >= ${breakpoint}px)` : undefined"
				>
			</template>
		</template>
	</picture>
</template>
