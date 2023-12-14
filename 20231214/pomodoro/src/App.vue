<template>
<v-app>
  <v-app-bar>
    <v-container class="d-flex align-center">
      <v-app-bar-title>番茄鐘</v-app-bar-title>
      <v-btn prepend-icon="mdi-home" to="/">首頁</v-btn>
      <v-btn prepend-icon="mdi-format-list-bulleted" to="/list">事件</v-btn>
      <v-btn prepend-icon="mdi-cog" to="/settings">設定</v-btn>
    </v-container>
  </v-app-bar>
  <v-main>
    <!-- {Component} = router-view 應該渲染(顯示)的路由元件-->
        <router-view v-slot="{Component}">
      <!-- keep-alive 保持被包住的元件不配銷毀
            使用 include 指定只有 HomeView 這個元件不被銷毀
            如果都 include 那會有效能問題 很多頁會變慢
            -->
            <!-- component 動態元件
                  使用 is 綁定的元件
            -->
      <keep-alive include="HomeView">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </v-main>
</v-app>
</template>

<script setup>
  //
</script>
