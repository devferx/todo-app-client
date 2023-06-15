<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

import todoApi from '../api/todoApi'

const router = useRouter()

const todos = reactive([])
const title = ref('')
const editTodoId = ref(null)

const fetchTodos = async () => {
  try {
    const { data } = await todoApi.get('/todos')
    todos.push(...data)
  } catch (err) {
    // if unauthorized, redirect to login
    if (err.response.status === 401) {
      router.push({ name: 'login' })
    }
  }
}

const mutateTodo = async () => {
  if (!title.value) return

  if (editTodoId.value) {
    const { data: updatedTodo } = await todoApi.put(`/todos/${editTodoId.value}`, {
      title: title.value
    })

    const index = todos.findIndex((t) => t.id === updatedTodo.id)
    todos[index] = updatedTodo
    title.value = ''
    editTodoId.value = null
    return
  }

  const res = await todoApi.post('/todos', {
    title: title.value
  })

  const todo = res.data
  todos.push(todo)
  title.value = ''
}

const completeTodo = async (todo) => {
  const { data: updatedTodo } = await todoApi.put(`/todos/${todo.id}`, {
    completed: !todo.completed
  })

  const index = todos.findIndex((t) => t.id === updatedTodo.id)
  todos[index] = updatedTodo
}

const editTodo = (todo) => {
  title.value = todo.title
  editTodoId.value = todo.id
}

const cancelEdit = () => {
  title.value = ''
  editTodoId.value = null
}

const deleteTodo = async (todo) => {
  const resp = await todoApi.delete(`/todos/${todo.id}`)

  if (resp.status === 200) {
    todos.splice(todos.indexOf(todo), 1)
  }
}

onMounted(() => {
  fetchTodos()
})
</script>

<template>
  <div class="container mt-2">
    <h1 class="fw-light">Todo App</h1>
    <form class="row" @submit.prevent="mutateTodo">
      <div class="col-4">
        <input class="form-control" placeholder="Todo title" type="text" v-model="title" />
      </div>
      <div class="col-3">
        <div class="d-flex gap-2" v-if="editTodoId">
          <button class="btn btn-warning">Edit</button>
          <button class="btn btn-danger" @click="cancelEdit">Cancel</button>
        </div>
        <button v-else class="btn btn-primary" type="submit">Create</button>
      </div>
    </form>
    <ul class="list-group mt-4">
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
        v-for="todo in todos"
        :key="todo.id"
      >
        <div>
          <input
            class="form-check-input"
            type="checkbox"
            v-model="todo.completed"
            @click="completeTodo(todo)"
          />
          <span class="m-2"
            ><span :class="{ completed: todo.completed }">{{ todo.title }}</span></span
          >
        </div>

        <div class="d-flex gap-2">
          <button class="btn btn-warning" @click="editTodo(todo)">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button class="btn btn-danger" @click="deleteTodo(todo)">
            <i class="bi bi-trash3-fill"></i>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
