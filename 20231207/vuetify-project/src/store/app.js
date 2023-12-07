// Utilities
import { defineStore } from 'pinia'

// defineStore (資料的名稱)
export const useAppStore = defineStore('app', {
  // 存那些東西
  state: () => ({
    number: 0
  }),
  // 有哪些修改資料的 function
  actions: {
    plus () {
      this.number++
    },
    minus () {
      this.number--
    }
  },
  // 有哪些取資料的 function
  getters: {
    square () {
      // return this.number ^ 2
      return Math.pow(this.number, 2)
    }
  }
})
