import { defineStore } from 'pinia'

const time = parseInt(import.meta.env.VITE_TIME)
const timeBreak = parseInt(import.meta.env.VITE_TIME_BREAK)

export const useListStore = defineStore('list', {
  state: () => ({
    items: [],
    id: 1,
    timeleft: time,
    break: false,
    finishedItems: [],
    currentItem: ''
  }),
  actions: {
    addItem (name) {
      this.items.push({
        id: this.id++,
        name,
        edit: false,
        model: name
      })
    },
    findIndexById (id) {
      return this.items.findIndex(item => item.id === id)
    },
    editItem (id) {
      const i = this.findIndexById(id)
      if (i < 0) return
      this.items[i].edit = true
    },
    delItem (id) {
      const i = this.findIndexById(id)
      if (i < 0) return
      this.items.splice(i, 1)
    },
    cancelEditItem (id) {
      const i = this.findIndexById(id)
      if (i < 0) return
      this.items[i].model = this.items[i].name
      this.items[i].edit = false
    },
    confirmEditItem (id) {
      const i = this.findIndexById(id)
      if (i < 0) return
      this.items[i].name = this.items[i].model
      this.items[i].edit = false
    },
    setCurrentItem () {
      // this.currentItem = this.items[0].name
      // this.items.splice(0, 1)
      this.currentItem = this.break ? '休息一下' : this.items.shift().name
    },
    countdown () {
      this.timeleft--
    },
    setFinishedItem () {
      if (!this.break) {
        this.finishedItems.push({
          name: this.currentItem,
          id: this.id++
        })
      }
      this.currentItem = ''
      if (this.items.length > 0) {
        this.break = !this.break
      }
      this.timeleft = this.break ? timeBreak : time
    },
    delFinishedItem (id) {
      const i = this.finishedItems.findIndex(item => item.id === id)
      if (i < 0) return
      this.finishedItems.splice(i, 1)
    }
  },
  persist: {
    key: 'pomodoro-list'
  }
})
