import { afterEach, describe, expect, it, vi } from 'vitest'
import { getAllFiles } from '../findDeep'

describe('utils/findDeep.ts', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('getAllFiles', async () => {
    /**
     * 创造出以下文件结构
     * - test 文件夹
     *  - a 文件夹
     *   - b 文件
     *  - c 文件
     *  - d 文件夹
     */
    vi.mock('fs-extra', async (importOriginal) => {
      const original: any = await importOriginal()
      return {
        ...original,
        statSync: vi.fn(uri => ({ isDirectory: () => uri === 'test\\a' || uri === 'test\\d' })),
        readdirSync: vi.fn(uri => ({ 'test': ['a', 'c', 'd'], 'test\\a': ['b'], 'test\\d': [] })[uri]),
      }
    })
    expect(getAllFiles('test')).toMatchObject(['test\\a\\b', 'test\\c'])
  })
})
