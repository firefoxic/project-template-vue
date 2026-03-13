<script setup lang="ts">
import { computed } from "vue"

let props = defineProps<{
	shape: string,
}>()

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
