<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>{{ currentText }}</h1>
        <h1>{{ currentTime }}</h1>
      </v-col>
      <v-col cols="12">
        <v-btn variant="text" icon="mdi-play" :disabled="status === STATUS.COUNTING ||currentItem.length === 0 && items.length ===0 " @click=" startTimer()"></v-btn>
        <v-btn variant="text" icon="mdi-pause" :disabled="status !== STATUS.COUNTING" @click="pauseTimer"></v-btn>
        <v-btn variant="text" icon="mdi-skip-next" :disabled="currentItem.length === 0" ></v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useListStore } from '@/store/List';
import { useSettingsStore } from '@/store/settings'
import { storeToRefs } from 'pinia';
import {ref,computed} from 'vue'

const list = useListStore()
const {currentItem,items,timeleft}= storeToRefs(list)
const {setCurrentItem,countdown} = list


const settings = useSettingsStore()

// 狀態碼teacher習慣用大寫
const STATUS={
  STOP:0,
  COUNTING:1,
  PAUSE:2
}

let timer = 0
const startTimer=()=>{
  if(status.value===STATUS.STOP && items.value.length>0)
  setCurrentItem()

  status.value=STATUS.COUNTING

  timer=setInterval(()=>{
  countdown()
},1000)
}

const status = ref(STATUS.STOP)




const pauseTimer=()=>{
  status.value=STATUS.PAUSE
  clearInterval(timer)
}

const currentText = computed(()=>{
  if(currentItem.value.length>0){
    return currentItem.value
  }else if(items.value.length>0){
    return '點擊開始'
  }else{
    return '沒有事項'
  }
})

const currentTime = computed(()=>{
  const m = Math.floor(timeleft.value / 60).toString().padStart(2,'0')
  const s = (timeleft.value % 60).toString().padStart(2, '0')
  return m + ':'+ s
})
</script>
