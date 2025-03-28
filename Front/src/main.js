import './assets/css/style.css'
import { createApp } from 'vue'
import {createPinia} from "pinia"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import App from './App.vue'
import router from './router'

import Pusher from "pusher-js"
const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true,
    authEndpoint: "broadcasting/auth"
})
const channel = pusher.subscribe("private-post-updated.1")
channel.bind("post.updated", (data) => {
    console.log(data)
});

// import Echo from "laravel-echo"
// window.Pusher = Pusher
// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: import.meta.env.VITE_PUSHER_APP_KEY,
//     cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
//     forceTLS: true
// })
// window.Echo.channel('test')
//     .listen('testing', (data) => {
//         console.log(data)
//     })


const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(router)
app.use(pinia)
app.use(ToastPlugin)
app.mount('#app')
