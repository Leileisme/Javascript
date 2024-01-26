<template>
  <v-btn @click="login" v-if="!user.token">Login</v-btn>
  <p @click="login" v-else>{{ user.token }}</p>
</template>

<script setup>
import { useUserStore } from '@/store/user'
const user = useUserStore()

const login = () => {
  // 點擊 Login 按鈕時，將使用者導向到後端的 /login
  const url = new URL('/login', import.meta.env.VITE_API)
  location.href = url.href
}
</script>
