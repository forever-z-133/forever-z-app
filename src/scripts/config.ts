import { resolve } from 'node:path'

/**
 * 番号电影所在的文件夹
 */
export const codeDirs = [
  resolve('F:\\坏'),
  resolve('E:\\下载3'),
  resolve('F:\\下载过'),
  resolve('F:\\无码'),
  resolve('F:\\有码'),
  resolve('F:\\写真'),
]

/**
 * 遍历文件夹时需排除的文件
 */
export const ignorePaths = ['node_modules']
