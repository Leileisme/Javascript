<template lang="pug">
TopImg
#left
  LeftMenu
#right
  RightMarquee
  #page
    RouterView

</template>

<script setup>
import TopImg from '@/components/TopImg.vue'
import LeftMenu from '@/components/LeftMenu.vue'
import RightMarquee from '@/components/RightMarquee.vue'
</script>
