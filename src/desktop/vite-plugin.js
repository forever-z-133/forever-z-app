const { join } = require('node:path')
const { default: electron } = require('vite-plugin-electron/simple')
// const { viteStaticCopy } = require('vite-plugin-static-copy')
const { startup: electronStartup } = require('./src/utils/electronStartup')

const rootPath = join(__dirname, '.')

function getViteElectronPlugin(env) {
  const commonConfig = {
    vite: {
      build: {
        outDir: join(rootPath, './dist'),
      },
      plugins: [
        // TODO: vite-plugin-static-copy 不支持 js 模式
        // viteStaticCopy({
        //   targets: [
        //     {
        //       src: join(rootPath, './src/assets/*.html'),
        //       dest: join(rootPath, './dist'),
        //     },
        //   ],
        // }),
      ],
    },
    onstart(ctx) {
      ctx.startup = electronStartup.bind(ctx)
      ctx.startup(['./', '--no-sandbox'], { env, cwd: rootPath })
    },
  }
  return electron({
    main: {
      entry: join(rootPath, './main.ts'),
      ...commonConfig,
    },
    preload: {
      input: join(rootPath, './preload.ts'),
      ...commonConfig,
    },
  })
}
module.exports = getViteElectronPlugin
