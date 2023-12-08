<template lang="pug">
VContainer
  VRow
    VCol(cols="12")
      h1 {{ appStore.number }}
      h1 {{ appStore.square }}
      h1 {{ number }}
      h1 {{ square }}
      VBtn(@click="appStore.plus") +
      VBtn(@click="appStore.minus") -
      VBtn(@click="plus") +
      VBtn(@click="minus") -
      VBtn(@click="number++") +
      VBtn(@click="number--") -
</template>

<script setup>
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()

// store 的 state 直接解構會失去響應性
// const { number } = appStore

// 使用 storeToRefs 輔助，解構維持響應性
const { number, square } = storeToRefs(appStore)
// function 固定不變，所以不需要 storeToRefs
const { plus, minus } = appStore
</script>
