<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import todoApi from '../api/todoApi'
import { useTokenStore } from '../stores/token'

const router = useRouter()
const tokenStore = useTokenStore()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const messageAlert = ref(null)

const onSubmit = async (ev) => {
  ev.preventDefault()
  if (password.value !== confirmPassword.value) {
    messageAlert.value = 'Password and confirm password must be the same'
    return
  }

  messageAlert.value = null

  try {
    const { data } = await todoApi.post('/auth/register', {
      email: email.value,
      password: password.value
    })

    const token = data.access_token
    tokenStore.login(token)
    router.push({ name: 'home' })
  } catch (error) {
    console.log(error)
    if (error.response) {
      messageAlert.value = error.response.data.message
    } else {
      messageAlert.value = error.message
    }
  }
}
</script>

<template>
  <form class="container" @submit="onSubmit">
    <div class="d-grid gap-2">
      <h2 class="mt-4 text-center">Create an account</h2>
      <img width="300" src="../assets/register.svg" alt="Login" />
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
      <input
        class="form-control"
        placeholder="Confirm Password"
        type="password"
        required
        v-model="confirmPassword"
      />
      <button class="btn btn-primary btn-lg">Register</button>
      <div class="alert alert-danger" role="alert" v-if="messageAlert">
        {{ messageAlert }}
      </div>
      <RouterLink to="/login"> You already have an account? Login here </RouterLink>
    </div>
  </form>
</template>

<style scoped>
.container {
  max-width: 330px;
}
</style>
