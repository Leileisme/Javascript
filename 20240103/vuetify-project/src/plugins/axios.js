import axios from 'axios'

export const api = axios.create({
  // 測試網址是'http://localhost:4000'，但之後是vue的網址
  // 所以會用.env去使用，比較好換
  baseURL: import.meta.env.VITE_API
})
