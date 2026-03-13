import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"

import HelloWorld from "../hello-world.vue"

describe(`HelloWorld`, () => {
	it(`renders properly`, () => {
		let wrapper = mount(HelloWorld, { props: { msg: `Hello Vitest` } })

		expect(wrapper.text()).toContain(`Hello Vitest`)
	})
})
