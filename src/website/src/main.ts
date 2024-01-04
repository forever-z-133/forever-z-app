import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/index'

import '@/styles/main/reset.less'
import '@/styles/main/app.less'
import '@/styles/main/elRewrite.less'

async function main() {
  const app = createApp(App)

  app.use(router)

  app.mount('#app')
}

main()
