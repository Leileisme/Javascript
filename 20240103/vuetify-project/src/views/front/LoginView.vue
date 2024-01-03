<template lang="pug">
VContainer
  VRow
    VCol(cols="12")
      h1 登入
    VDivider
    VCol(cols="12")
      //- 送出的時候停止表單
      VForm(:disabled="isSubitting" @submit.prevent="submit")
        //- counter 計數器 預設type是text
        VTextField(label="帳號" maxlength="20" minlength="4" counter v-model="account.value.value" :error-messages="account.errorMessage.value")
        VTextField(label="密碼" maxlength="20" minlength="4" counter type="password" v-model="password.value.value" :error-messages="password.errorMessage.value")
        VBtn(type="submit" color="green") 登入
</template>

<script setup>
// Vue 的表單的驗證
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
// 這裡不用加js，因為 vite引用的時候會自動去找相關的檔案
import { api } from '@/plugins/axios'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'

const router = useRouter()
const createSnackbar = useSnackbar()

// 定義註冊表單的資料格式
const schema = yup.object({
  account: yup
    .string()
    .required('帳號為必填欄位')
    .min(4, '使用者帳號長度不符')
    .max(20, '使用者帳號長度不符'),
  password: yup
    .string()
    .required('密碼為必填欄位')
    .min(4, '密碼長度不符')
    .max(20, '密碼長度不符')
})

// useForm建立一個表單
const { handleSubmit, isSubitting } = useForm({
  // 驗證的格式：schema
  validationSchema: schema
})

// useField建立表單的欄位
const account = useField('account')
const password = useField('password')

const submit = handleSubmit(async (values) => {
  try {
    // 因為有引入 axios 並有 baseURL 所以路由'/users'即可
    await api.post('/users/login', {
      account: values.account,
      password: values.password
    })
    // 類日 alter 的通知
    createSnackbar({
      text: '登入成功',
      showCloseButton: false,
      // 傳到後端???
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    // 註冊完跳頁
    router.push('/')
  } catch (error) {
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    // 如果有回復錯誤訊息
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        console: 'red',
        location: 'bottom'
      }
    })
  }
})
</script>
