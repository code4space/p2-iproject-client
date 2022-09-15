import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
// export default {

// }

const app = createApp(App)

const pinia = createPinia()
pinia.use(({store}) => {
    store.router = markRaw(router)
})
app.use(pinia)
app.use(router)

app.mount('#app')
