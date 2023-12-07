import './sass/main.sass'
// 可以引入其他的東西 EX：bootstrap(尚不支援vue3)
// import 'bootstrap/'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
