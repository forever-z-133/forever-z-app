import { join } from 'node:path'

const thisDir = __dirname

export default {
  resolve: {
    alias: {
      '@': join(thisDir, 'stories'),
    },
  },
}
