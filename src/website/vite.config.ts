import { join } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron/simple'
import type { APP_PROJECT } from 'types/website.d.ts'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { startup as electronStartup } from 'desktop/src/utils/electronStartup'

const thisDir = __dirname

function getElectronPlugin(env: NodeJS.ProcessEnv) {
  if (env.APP_PROJECT !== 'desktop') return
  const commonConfig = {
    vite: {
      build: {
        outDir: '../desktop/dist',
      },
    },
    onstart(ctx) {
      ctx.startup = electronStartup.bind(ctx)
      ctx.startup(['../desktop', '--no-sandbox'], { env })
    },
  }
  return electron({
    main: {
      entry: '../desktop/main.ts',
      ...commonConfig,
    },
    preload: {
      input: '../desktop/preload.ts',
      ...commonConfig,
    },
  })
}

export default defineConfig(({ command, mode }) => {
  const envConfig = loadEnv(mode, join(thisDir, '.'))
  const { NODE_ENV } = process.env
  const { VITE_BASE_PATH = '' } = envConfig
  const APP_PROJECT = mode as APP_PROJECT
  const BASE_PATH = VITE_BASE_PATH
  const env = { NODE_ENV, APP_PROJECT, BASE_PATH }

  return {
    base: BASE_PATH,
    publicDir: join(thisDir, './public'),
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      getElectronPlugin(env),
    ],
    build: {
      sourcemap: true,
    },
    define: {
      '__VUE_PROD_DEVTOOLS__': command === 'serve' ? 'true' : 'false', // 本地启动开启浏览器 devtools 工具
      'process.env': env,
    },
    resolve: {
      alias: {
        '@': join(thisDir, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            hack: 'true; @import (reference) "common/styles/variables.less";\n@import (reference) "common/styles/mixins.less";\n',
          },
        },
      },
    },
  }
})
