import { defineConfig } from 'vitest/config'
import tsconfidPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfidPaths()],
})
