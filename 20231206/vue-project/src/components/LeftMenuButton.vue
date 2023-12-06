<template lang="pug">
li {{ text }}

</template>

<script setup>
// 定義Props的語法
defineProps({
  text: String
})
</script>
