#!/usr/bin/env node
import { dirname, resolve } from 'node:path'
import { program } from 'commander'
import fsExtra from 'fs-extra'
import { spawn } from 'cross-spawn'

const { readJSONSync } = fsExtra

const thisDir = dirname(process.argv[1])
const scriptsRootDir = resolve(thisDir, '..')

const pkgPath = resolve(scriptsRootDir, 'package.json')
const pkg = readJSONSync(pkgPath)

program
  .name('forZ')
  .description('来自 forever-z-133 的脚本')
  .version(pkg.version)

program
  .command('check')
  .description('番号名称规范检查')
  .action(() => run('check'))

program
  .command('rename')
  .description('番号名称规范化')
  .argument('[fileDir]', '需操作的文件夹')
  .action(fileDir => run('rename', fileDir))

program
  .command('remove')
  .description('删除觉得不好看的番号')
  .argument('[code]', '需删除的番号')
  .action(code => run('remove', code))

program
  .command('exist')
  .description('查找番号是否存在')
  .argument('[code]', '需查找的番号')
  .action(code => run('exist', code))

program
  .command('test')
  .description('测试脚本')
  .argument('[args...]', '测试脚本的入参')
  .action(args => run('test', ...args))

program.parse()

function run(command, ...args) {
  spawn('npm', ['run', command, ...args.filter(a => a && a !== 'undefined')], { stdio: 'inherit', cwd: scriptsRootDir })
}
