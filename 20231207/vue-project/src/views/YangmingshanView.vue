<template lang="pug">
h1 陽明山
//- p {{ $route.path }}
//- 可加可不加，沒加的話 <script> 要用 const route = useRoute()

//- 這兩個的差異
//- 查 query 參數(fullPath) 語法(?a=b&c=d)??
//- fullPath 像是 google map 搜尋東西，網址把搜尋的內容寫出來，貼給別人就可以直接有「搜尋的字」
p {{ $route.path }}
p {{ $route.fullPath }}
input(type="button" value="上一頁" @click="goPrev")
input(type="button" value="回首頁" @click="goHome")

</template>

<script setup>
// {取資料，換頁}
// use 開頭，是一種命名風格
import { useRoute, useRouter } from 'vue-router'

// 取目前路由資訊
const route = useRoute()
// 路由操作
const router = useRouter()

const goPrev = () => {
  // router.go(相對數字)
  // > 0 後幾頁
  // < 0 前幾頁
  router.go(-1)
}

const goHome = () => {
  // router.push (路徑)
  // router.push('/')

  // router.push(指定路徑名稱)
  router.push({ name: 'home' })
}
</script>

<!-- <script>
export default {
  methods: {
    goPrev() {
      this.$router.go(-1)
    },
    goHome() {
      this.$router.push('/')
    }
  },
  mounted() {
    console.log(this.$route.path)
  }
}
</script> -->
