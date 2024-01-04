/**
 * vite-plugin-electron 的 startup 扩展
 * 其实可接收来自 vite 的参数，注入进 electron 的 process.env
 *
 * @param argv spawn 的第二个参数，默认 ['.', '--no-sandbox']
 * @param options  spawn 的第三个参数，默认 { stdio: 'inherit' }
 */
async function startup(argv = ['.', '--no-sandbox'], options) {
  const { spawn } = await import('node:child_process')
  const electron2 = await import('electron')
  const electronPath = electron2.default ?? electron2
  await startup.exit()
  const env = { ...process.env, ...options?.env }
  process.electronApp = spawn(electronPath, argv, { stdio: 'inherit', ...options, env })
  process.electronApp.once('exit', process.exit)
  if (!startup.hookedProcessExit) {
    startup.hookedProcessExit = true
    process.once('exit', () => {
      startup.exit()
      process.electronApp.kill()
    })
  }
}
startup.hookedProcessExit = false
startup.exit = async () => {
  if (process.electronApp) {
    process.electronApp.removeAllListeners()
    await import('tree-kill').then(m => m.default(
      process.electronApp.pid,
      'SIGKILL',
      error => error && process.electronApp.kill(),
    )).catch((e) => {
      process.electronApp.kill()
      if (e.code === 'ERR_MODULE_NOT_FOUND') {
        console.log(
          '[vite-plugin-electron]',
          'Please install tree-kill to exit all associated processes, run "npm i tree-kill -D".',
        )
      } else {
        console.error(e)
      }
    })
  }
}
exports.startup = startup
