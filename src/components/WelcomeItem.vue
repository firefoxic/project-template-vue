<script setup>
let props = defineProps({ // eslint-disable-line
	shape: {
		type: String,
		required: true,
	},
})
</script>

<template>
	<div class="item">
		<div class="icon">
			<slot name="icon"></slot>
		</div>
		<div class="details">
			<h2>
				<slot name="heading"></slot>
			</h2>
			<slot></slot>
		</div>
	</div>
</template>

<style scoped>
.item {
	--List-Gap: 1rlh;
	display: block grid;
	gap: 0.5rem;
	grid-template-columns: min-content 1fr;
	position: relative;
	isolation: isolate;

	&:first-of-type {
		--IsFirstItem: 1;
	}

	&:last-of-type {
		--IsLastItem: 1;
	}
}

.icon {
	box-sizing: border-box;
	place-self: start;
	margin-block: 0.5rem;
	display: block grid;
	grid-template: 1.5rem / 1.5rem;
	place-content: center;
	inline-size: var(--Icon-Size, 2rem);
	aspect-ratio: 1;
}

h2 {
	font-weight: 320;
	margin-block: 0.5rem;
	line-height: 1;
	color: var(--ColorUI-Heading);
}
</style>
