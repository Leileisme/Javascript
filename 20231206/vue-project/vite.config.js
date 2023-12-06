import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // 打包指令，原本預設跟目錄D槽，更改/代表在資料夾 (每次打包都是重新打包dist)
  // 打包是轉成瀏覽器可看的 html ，如果直接從 vue 給的網址，別人可以看到妳的開發環境
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
