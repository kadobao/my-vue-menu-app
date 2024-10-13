import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'  // 引入 router

const app = createApp(App)

app.use(ElementPlus)
app.use(router)  // 确保使用了 router
app.mount('#app')
