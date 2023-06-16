<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import http from 'axios'

import { useTokenStore } from '../stores/token'

const router = useRouter()
const tokenStore = useTokenStore()

const email = ref('admin@gmail.com')
const password = ref('')

const onSubmit = async (ev) => {
  ev.preventDefault()
  http
    .post('http://localhost:3005/api/auth/login', {
      email: email.value,
      password: password.value
    })
    .then((res) => {
      const token = res.data.access_token
      tokenStore.login(token)
      router.push({ name: 'home' })
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>
<template>
  <form class="container" @submit="onSubmit">
    <h3 class="">Login</h3>
    <input class="form-control" placeholder="Email" type="text" v-model="email" autofocus />
    <input class="form-control" placeholder="Password" type="text" v-model="password" />
    <button class="btn btn-primary btn-large">Login</button>
  </form>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  max-width: 330px;
}
</style>
