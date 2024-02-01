import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'

/**
 * 安装默认的 chrome 插件
 * 比如 vuejs devtool
 */
export default function installDefaultExtension() {
  return installExtension(VUEJS_DEVTOOLS)
    .then((name) => {
      console.log(`add extension: ${name}`)
    })
    .catch((err) => {
      console.log('devtools error: ', err)
    })
}
