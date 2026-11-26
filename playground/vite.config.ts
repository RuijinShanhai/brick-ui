import { defineConfig } from 'vite'
import jsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
import svg from 'vite-svg-loader'
import { transform } from 'sucrase'
import { fileURLToPath } from 'node:url'
const root = fileURLToPath(new URL('..', import.meta.url))
export default defineConfig({
  base: './',
  plugins: [{ name: 'sutras-ts-compat', enforce: 'pre', transform(code,id) { if(id.includes('/sutras/') && /\.ts$/.test(id)) return transform(code,{transforms:['typescript'],filePath:id}).code } }, vue(), jsx(), svg()],
  resolve: { dedupe: ['vue'], alias: {
    '@brick/components': `${root}/components/src/index.ts`,
    '@sgwm-sutras/style': `${root}/sutras/style/src/index.ts`,
    '@sgwm-sutras/console/style.css': `${root}/sutras/console/src/style/styles.css`,
    '@sgwm-sutras/ui': `${root}/sutras/ui/src/index.ts`,
    '@sgwm-sutras/hooks': `${root}/sutras/hooks/src/index.ts`,
    '@sgwm-sutras/shared': `${root}/sutras/shared/src/index.ts`,
    '@sgwm-sutras/console': `${root}/sutras/console/src/index.ts`,
  } },
  build: { outDir: 'dist', emptyOutDir: true },
  css: { preprocessorOptions: { scss: { additionalData: `@use "${root}/sutras/style/src/scss/index.scss" as *; @import "${root}/sutras/ui/src/style/vars.scss";` } } },
})
