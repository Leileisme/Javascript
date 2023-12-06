<template lang="pug">
li {{ text }}
</template>

<script setup>
defineProps({
  text: String
})
</script>
