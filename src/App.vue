<script setup>
import { RouterLink, RouterView } from "vue-router"

import HelloWorld from "@/components/hello-world.vue"
</script>

<template>
	<header>
		<img alt="Vue logo" class="logo" src="/images/logo.svg" width="240" height="240">

		<hello-world msg="You did it!"></hello-world>

		<nav>
			<router-link to="/">
				Home
			</router-link>
			<router-link to="/about">
				About
			</router-link>
		</nav>
	</header>

	<router-view></router-view>
</template>

<style scoped>
.logo {
	display: block flow;
	margin-inline: auto;
	margin-block: 0;
}

nav {
	inline-size: 100%;
	text-align: center;

	a {
		display: inline flow-root;
		padding: 0 1rem;
		border-inline-start: 1px solid var(--color-ui-border);

		&:first-of-type {
			border: 0;
		}

		&.router-link-exact-active {
			color: var(--color-ui-text);

			&:hover {
				background-color: transparent;
			}
		}
	}
}
</style>
