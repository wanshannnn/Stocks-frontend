import { createApp } from 'vue';
import { createPinia } from 'pinia';
import '@/assets/base.css'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import piniaPersist from 'pinia-plugin-persistedstate';
import '@/utils/mock';
import App from '@/App.vue';
import router from '@/router';

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPersist)

app.use(pinia)
app.use(router)
app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')
