<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import http from 'axios'

import { useTokenStore } from '../stores/token'

const router = useRouter()
const tokenStore = useTokenStore()

const email = ref('admin@gmail.com')
const password = ref('')
const showAlert = ref(false)

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
      showAlert.value = true
    })
}
</script>
<template>
  <form class="container" @submit="onSubmit">
    <div class="d-grid gap-2">
      <h2 class="mt-4 text-center">Login</h2>
      <img width="300" src="../assets/login.svg" alt="Login" />
      <input
        class="form-control"
        placeholder="Email"
        type="email"
        required
        v-model="email"
        autofocus
      />
      <input
        class="form-control"
        placeholder="Password"
        type="password"
        required
        v-model="password"
      />
      <!-- label alert -->

      <button class="btn btn-primary btn-lg">Login</button>
      <div class="alert alert-danger" role="alert" v-if="showAlert">
        Email or password is incorrect
      </div>
    </div>
  </form>
</template>

<style scoped>
.container {
  max-width: 330px;
}
</style>
