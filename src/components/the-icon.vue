<script setup>
import { computed } from "vue"

let props = defineProps({
	shape: {
		type: String,
		required: true,
	},
})

let computedStyle = computed(() => ({
	"--icon": `var(--icon-shape-${props.shape})`,
}))
</script>

<template>
	<span :style="computedStyle"></span>
</template>

<style scoped>
span {
	display: block flow-root;
	inline-size: 100%;
	aspect-ratio: 1;
	background: currentcolor;
	mask: var(--icon) center / contain no-repeat;
}
</style>
