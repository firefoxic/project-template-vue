<script setup>
import { RouterLink, RouterView } from "vue-router"

import HelloWorld from "@/components/HelloWorld.vue"
</script>

<template>
	<header>
		<img alt="Vue logo" class="logo" src="@/shared/images/logo.svg" width="240" height="240">

		<div class="wrapper">
			<HelloWorld msg="You did it!" />

			<nav>
				<RouterLink to="/">
					Home
				</RouterLink>
				<RouterLink to="/about">
					About
				</RouterLink>
			</nav>
		</div>
	</header>

	<RouterView />
</template>

<style scoped>
header {
	@media (width >= 1024px) {
		display: block flex;
		place-items: center;
	}

	.wrapper {
		@media (width >= 1024px) {
			display: block flex;
			place-items: flex-start;
			flex-wrap: wrap;
		}
	}
}

.logo {
	display: block flow;
	margin-inline: auto;
	margin-block: 0;

	@media (width >= 1024px) {
		margin-inline: 0;
		margin-block: 0;
	}
}

nav {
	inline-size: 100%;
	text-align: center;

	a {
		display: inline flow-root;
		padding: 0 1rem;
		border-inline-start: 1px solid var(--ColorUI-Border);

		&:first-of-type {
			border: 0;
		}

		&.router-link-exact-active {
			color: var(--ColorUI-Text);

			&:hover {
				background-color: transparent;
			}
		}
	}
}
</style>
