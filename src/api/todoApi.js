import axios from 'axios'

const baseURL = 'http://localhost:3005/api'

const todoApi = axios.create({ baseURL })

todoApi.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default todoApi
