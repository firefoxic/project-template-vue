<script setup>
import Picture from "../components/Picture.vue"
</script>

<template>
	<div class="about">
		<h2>This is an about page</h2>

		<Picture name="eclipse" class="Image" alt="Eclipse" />
	</div>
</template>

<style>
.about {
	@media (width >= 1024px) {
		display: block grid;
		align-items: center;
	}
}
</style>
