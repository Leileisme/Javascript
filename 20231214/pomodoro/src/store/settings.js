import {defineStore} from 'pinia'

// settings　是資料名稱
export const useSettingsStore = defineStore('settings',{
  // 這邊加()不用再加()=>({})  return
  state:()=>({
    // 鈴聲資料數
    alarms:[
      {id:1,name:'鬧鐘',file:new URL('@/assets/alarm.mp3',import.meta.url).href},
      {id:2,name:'yay',file:new URL('@/assets/yay.mp3',import.meta.url).href},
    ],
    // 預設為第一個
    selectedAlarm:1
})
})