<template lang="pug">
//- 手機板側欄
VNavigationDrawer(v-model="drawer" temporary location="left" v-if="isMobile")
  //- props 不會是整行 會在list裡面 有圓角
  VList(nav)
    template(v-for="item in navItems" :key="item.to")
      VListItem(:to="item.to")
        template(#prepend)
          VIcon(:icon="item.icon")
        VListItemTitle {{ item.text }}

VAppBar(color="primary")
  VContainer.d-flex.align-center
    VBtn(to='/')
      VAppBarTitle 購物網
    VSpacer
    //- 手機版導覽列
    //- 判斷是不是手機板 isMobile
    template(v-if="isMobile")
      VAppBarNavIcon(@click="drawer=true")
    //- 電腦版導覽列
    template(v-else)
      template(v-for="item in navItems" :key="item.to")
        VBtn(:to='item.to' :prepend-icon="item.icon") {{ item.text }}
//- 頁面內容
VMain
  RouterView
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { computed, ref } from 'vue'

// 手機版判斷
const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)

// 手機版側欄開關
const drawer = ref(false)

const navItems = [
  { to: '/register', text: '註冊', icon: 'mdi-account-plus' },
  { to: '/login', text: '登入', icon: 'mdi-login' }
]
</script>
