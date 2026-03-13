<script setup lang="ts">
defineProps<{
	msg: string,
}>()
</script>

<template>
	<div class="greetings">
		<h1>
			{{ msg }}
		</h1>
		<p>You’ve successfully created a project with <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> + <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.</p>
	</div>
</template>

<style scoped>
.greetings {
	text-align: center;
}

h1 {
	font-weight: 280;
	margin: 0em;
	color: var(--color-ui-accent);
}

p {
	font-size: 1.2rem;
}
</style>
