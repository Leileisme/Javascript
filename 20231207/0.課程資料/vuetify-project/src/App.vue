<template lang="pug">
//- v-app
VApp
  VAppBar
    VContainer.d-flex.align-center
      VAppBarTitle 測試
      VBtn(prepend-icon="mdi-home" to="/") 首頁
      VBtn(prepend-icon="mdi-information" to="/about") 關於
  VMain
    RouterView
</template>

<script setup>

</script>
