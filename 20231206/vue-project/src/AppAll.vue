<template>
  <h1>{{ text }}</h1>
  <MyText></MyText>
</template>

<!-- <script>
export default {
  data() {
    return {
      text: 'abc'
    }
  }
}
</script> -->

<!-- <script>
// 第一種寫法
// import MyText from './components/MyText.vue'
// src資料夾是??? @這是Vue專屬
import MyText from '@/components/MyText.vue'

export default {
  data() {
    return {
      text: 'aaa'
    }
  },
  components: {
    MyText
  }
}
</script> -->

<!-- <script>
import { ref } from 'vue'
export default {
  setup () {
    const text = ref('vvv')
    return {
      text
    }
  }
}
</script> -->

<!-- <script>
import { ref } from 'vue'
import MyText from '@/components/MyText.vue'

export default {
  setup() {
    const text = ref('abc')
    return {
      text
    }
  },
  components: {
    MyText
  }
}
</script> -->

<!-- <script setup>
import { ref } from 'vue'
const text = ref(111)
</script> -->

<script setup>
import MyText from './components/MyText.vue'
import { ref } from 'vue'
const text = ref('abc')
</script>

<!-- 這邊的CSS會影響整個網頁 -->
<style></style>
