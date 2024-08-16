<script setup>
import { computed } from 'vue'

let props = defineProps({
	shape: {
		type: String,
		required: true,
	},
})

let computedStyle = computed(() => ({
	"--Icon": `var(--Icon_shape_${props.shape})`,
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
	mask: var(--Icon) center / contain no-repeat;
}
</style>
