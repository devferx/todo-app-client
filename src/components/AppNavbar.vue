<script setup>
import { useRouter } from 'vue-router'
import { useTokenStore } from '../stores/token'

const router = useRouter()
const tokenStore = useTokenStore()

const logout = () => {
  tokenStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <nav
    class="navbar navbar-expand-lg bg-body-tertiary navbar bg-dark border-bottom border-bottom-dark"
    data-bs-theme="dark"
  >
    <div class="container-fluid d-flex align-items">
      <a class="navbar-brand" href="#">Todo App</a>
      <button class="btn btn-outline-danger" v-if="tokenStore.token" @click="logout">Logout</button>
    </div>
  </nav>
</template>
