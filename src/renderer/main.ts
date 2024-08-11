import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/renderer/App.vue'
import router from '@/renderer/router'
import vuetify from '@/renderer/plugins/vuetify'
import i18n from '@/renderer/plugins/i18n'
// import '@/renderer/public/font/globalFont.css'
import '@/renderer/public/font/qiuhongkai.ttf'

// Add API key defined in contextBridge to window object type
declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    mainApi?: any
  }
}

const app = createApp(App)

app.use(vuetify).use(createPinia()).use(i18n).use(router)

app.mount('#app')
