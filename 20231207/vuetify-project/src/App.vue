<template lang="pug">
//- 這兩種寫法都可以，在Vite也可以?
//- HomeVive
//- home-view

//- v-app或這樣寫
//- 它需要有一個VApp包起來
VApp
  //- 導覽列
  VAppBar
    //- VContainer
    v-app-bar-nav-icon(color="red")
    v-app-bar-title 標題測試

    VBtn(prepend-icon="mdi-abjad-arabic" to="/")

    VBtn 123
      template(#prepend)
        VIcon mdi-home
  VMain
    RouterView
//- icon????改內建的語法樣式
//- 內建icon風格是Material Design Icons
//- 可以改成 Font Awesome 風格
</template>

<script setup>
//
</script>
