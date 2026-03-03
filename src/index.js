import "./index.css" // eslint-disable-line simple-import-sort/imports

import { createPinia } from "pinia"
import { createApp } from "vue"

import App from "./App.vue"
import router from "./router"

let app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount(`#app`)
