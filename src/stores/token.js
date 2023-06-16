import { defineStore } from 'pinia'

export const useTokenStore = defineStore({
  id: 'token',
  state: () => ({
    token: localStorage.getItem('token') || null
  }),
  actions: {
    login(token) {
      this.token = token
      localStorage.setItem('token', token)
    },
    logout() {
      this.token = null
      localStorage.removeItem('token')
    }
  }
})
