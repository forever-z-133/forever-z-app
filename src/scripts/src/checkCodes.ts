import { format, parse } from 'node:path'
import type { ParsedPath } from 'node:path'
import chalk from 'chalk'
import { getAllCodeFiles } from './utils/getAllCodeFiles'
import { convertCodeName, removeCodeNamePart } from './utils/codeName'

/**
 * 检查所有番号文件，看是否存在异常
 * @returns 检查结果 [[pureCode, [files]]]
 */
export function getConflictCodesData() {
  type Conflict = [string, string[]]
  const conflicts: Conflict[] = []

  // 获取所有番号文件
  const files = getAllCodeFiles()

  // 将其按番号字母顺序排序
  const filesData = files.map(file => parse(file))
  const sorted = filesData.sort((a, b) => a.name > b.name ? 1 : -1)

  // 转化相关数据，方便后续获取与比较
  const codes = sorted.map(data => convertCodeName(data.name))
  const pureCodes = codes.map(code => removeCodeNamePart(code))

  // 开始比较冲突
  sorted.reduce((a, b, index) => {
    const pureCodeA = pureCodes[index - 1]
    const pureCodeB = pureCodes[index]

    // 若存在冲突，则拼凑成 [pureCode, [file]] 格式
    // TODO: 若两个同名且连续，但文件后缀不同，该情况应当属于正确
    // TODO: 若三个同名，但两个正常一个异常，该情况未处理
    if (pureCodeA === pureCodeB && isConflict(a, b)) {
      const fileA = format(a)
      const fileB = format(b)
      const has = conflicts.find(([c]) => c === pureCodeA)
      if (has) has[1].push(fileB)
      else conflicts.push([pureCodeA, [fileA, fileB]])
    }

    return b
  })

  return conflicts
}

/**
 * 判断是否文件是否冲突
 * @example 冲突1：相同名称在不同文件夹下
 * @example 冲突2：相同名称不同后缀
 * @example 冲突3：相同名称一个带分批一个不带分批，或者两个带分批但不连续
 * @param a 文件数据a
 * @param b 文件数据b
 * @returns 存在冲突
 */
function isConflict(a: ParsedPath, b: ParsedPath) {
  if (a.ext !== b.ext) return true
  if (a.dir !== b.dir) return true
  if (a.name.slice(-1).charCodeAt(0) - b.name.slice(-1).charCodeAt(0) !== -1) return true
  return false
}

/**
 * 若由脚本启动，则直接运行
 */
(async () => {
  if (process.env.RUN_BY === 'scripts') {
    const codes = getConflictCodesData()
    codes.forEach(([pureCode, files]) => {
      console.group(chalk.green(pureCode))
      console.log(files.join('\n'))
      console.groupEnd()
    })
  }
})()
