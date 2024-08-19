import { defineStore } from "pinia"
import { computed, ref } from "vue"

export let useCounterStore = defineStore(`counter`, () => {
	let count = ref(0)
	let doubleCount = computed(() => count.value * 2)

	function increment () {
		count.value++
	}

	return { count, doubleCount, increment }
})
