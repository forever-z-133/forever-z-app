import { join } from 'node:path'

const thisDir = __dirname

export default {
  build: {
    outDir: join(thisDir, 'dist'),
  },
}
