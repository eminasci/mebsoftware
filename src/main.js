import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import router, {} from './routes'
import '@fortawesome/fontawesome-free/css/all.css'


createApp(App).use(router).mount('#app')
