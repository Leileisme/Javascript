<template>
  <h1>{{ text }}</h1>
  <MyTest></MyTest>
</template>

<!-- <script>
// import MyTest from './components/MyTest.vue'
import MyTest from '@/components/MyTest.vue'
export default {
  data () {
    return {
      text: 'abc'
    }
  },
  components: {
    MyTest
  }
}
</script> -->

<!-- <script>
import { ref } from 'vue'
import MyTest from '@/components/MyTest.vue'

export default {
  setup () {
    const text = ref('abc')
    return {
      text
    }
  },
  components: {
    MyTest
  }
}
</script> -->

<script setup>
import MyTest from '@/components/MyTest.vue'
import { ref } from 'vue'
const text = ref('abc')
</script>
