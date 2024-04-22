import { readFileSync } from 'node:fs'
import { normalize, parse } from 'node:path'
import chalk from 'chalk'
import { convertCodeName, getCodeName, removeCodeNamePart } from './utils/codeName'
import { getAllCodeFiles } from './utils/getAllCodeFiles'
import { askText } from './utils/question'

interface PickLinkData {
  code: string
  link: string
}

// 获取所有番号，转为对象方便比对是否已下载
const allFiles = getAllCodeFiles()
const codeMap = allFiles.reduce((re, file) => {
  const code = removeCodeNamePart(parse(file).name)
  re[code] = true
  return re
}, {} as { [code: string]: boolean })

/**
 * 提取番号
 * @example: forZ pick 'F:\种子\冲田杏梨沖田杏梨観月あかねAnnri Okita.txt'
 */

// 提取番号，返回番号和链接
function getPickLinkData(entryFile: string) {
  // 读取内容
  const content = readFileSync(normalize(entryFile), 'utf-8')
  const lines = content.split(/\r?\n/)

  // 拆分每一行，提取标准化番号
  const result = lines.reduce((re, link) => {
    if (!link) return re
    let code = getCodeName(link)
    code = code ? convertCodeName(code) : ''
    return re.concat({ code, link })
  }, [] as PickLinkData[])

  return result
}

// 拆分番号，进行展示
function logPickLinkData(linkData: PickLinkData[]) {
  // 番号错误的
  const errors = linkData.filter(({ code }) => !code)
  // 已下载的
  const include = linkData.filter(({ code }) => code && codeMap[code] === true)
  // 未下载的
  const exclude = linkData.filter(({ code }) => code && codeMap[code] !== true)

  include.forEach(({ code, link }) => {
    console.log(chalk.green('已下载'), code.padEnd(12, ' '), link)
  })
  exclude.forEach(({ code, link }) => {
    console.log(chalk.yellow('未下载'), code.padEnd(12, ' '), link)
  })
  errors.forEach(({ code, link }) => {
    console.log(chalk.yellow('错误'), code.padEnd(12, ' '), link)
  })
}

/**
 * 若由脚本启动，则直接运行
 */
(async () => {
  if (process.env.RUN_BY === 'scripts') {
    const args = process.argv.slice(2)
    const [entryFileByCli = ''] = args
    const entryFile = entryFileByCli || await askText('要提取的文件：')
    const links = getPickLinkData(entryFile.trim())
    logPickLinkData(links)
  }
})()
