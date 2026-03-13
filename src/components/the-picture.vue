<script setup lang="ts">
import { images } from "@/shared/data.json" with { type: "json" }

type ImageName = keyof typeof images

type PictureProps = {
	"name": ImageName,
	"alt"?: string,
	"class"?: string,
	"loading"?: `lazy` | `eager`,
	"decoding"?: `async` | `auto` | `sync`,
}

let { name, alt = ``, class: classList = ``, loading = `lazy`, decoding = `async` } = defineProps<PictureProps>()

let { maxDensity, formats, sizes } = images[name]

function isTagImg (formatIndex: number, sizeIndex: number): boolean {
	let isLastFormat = formatIndex === formats.length - 1
	let isLastSize = sizeIndex === sizes.length - 1

	return isLastFormat && isLastSize
}

function getSrcValue (imageName: string, format: string, breakpoint?: number): string {
	let breakpointSuffix = breakpoint ? `~${breakpoint}` : ``
	return `/images/${imageName}${breakpointSuffix}@1x.${format}`
}

function getSrcsetValue (isImg: boolean, imageName: string, format: string, breakpoint?: number): string {
	let srcset = ``

	for (let density = maxDensity; density !== 0; density -= 1) {
		if (isImg && density === 1) continue

		let breakpointSuffix = breakpoint ? `~${breakpoint}` : ``
		let sourceName = `${imageName}${breakpointSuffix}@${density}x`
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
			<template v-for="({ breakpoint, width, height }, sizeIndex) in sizes" :key="sizeIndex">
				<img
					v-if="isTagImg(formatIndex, sizeIndex)"
					:class="classList"
					:src="getSrcValue(name, format, breakpoint)"
					:srcset="getSrcsetValue(true, name, format, breakpoint)"
					:width
					:height
					:loading
					:decoding
					:alt
				>
				<source
					v-else
					:srcset="getSrcsetValue(false, name, format, breakpoint)"
					:type="`image/${format}`"
					:width
					:height
					:media="breakpoint ? `(width <= ${breakpoint}px)` : undefined"
				>
			</template>
		</template>
	</picture>
</template>
