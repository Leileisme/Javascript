// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'
import { VitePluginRadar } from 'vite-plugin-radar'
import { VitePWA } from 'vite-plugin-pwa'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    vuetify({
      autoImport: true
    }),
    ViteFonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900'
        }]
      }
    }),
    VitePluginRadar({
      // Google Analytics tag injection
      analytics: {
        id: 'G-EP7N8FWQZ9'
      }
    }),
    VitePWA({
      // 設定快取自動更新
      registerType: 'autoUpdate',
      // Service Worker 產生器設定
      workbox: {
        // 清除過期的快取
        cleanupOutdatedCaches: true,
        // 快取檔案路徑
        globPatterns: [
          // 任意資料夾內任意檔名，符合這些副檔名的檔案
          '**/*.{html,css,js,woff,eot,ttf,woff2,ico,jpg,jpeg,png,svg,gif}**'
        ],
        // 忽略網址參數，預設不會快取有參數的檔案或頁面
        ignoreURLParametersMatching: [/.*/]
      },
      manifest: {
        // 名稱
        name: '番茄鐘',
        short_name: '番茄鐘',
        // 工具列顏色
        theme_color: '#1867C0',
        // 啟動畫面的背景色
        background_color: '#1867C0',
        // 啟動網址
        start_url: './',
        // PWA 顯示範圍，超出範圍會啟動瀏覽器
        scope: './',
        // 顯示方式
        display: 'standalone',
        icons: [
          {
            src: './android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: './android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue'
    ]
  },
  server: {
    port: 3000
  }
})
