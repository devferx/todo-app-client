<script setup>
import { ref, onMounted, reactive } from 'vue'

const todos = reactive([])
const title = ref('')

const fetchTodos = async () => {
  const res = await fetch('http://localhost:3005/api/todos')
  const data = await res.json()
  todos.push(...data)
}

const createTodo = async () => {
  if (!title.value) return

  const res = await fetch('http://localhost:3005/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: title.value })
  })

  const todo = await res.json()
  todos.push(todo)
  title.value = ''
}

const completeTodo = async (todo) => {
  const res = await fetch(`http://localhost:3005/api/todos/${todo.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: !todo.completed })
  })

  const updatedTodo = await res.json()
  const index = todos.findIndex((t) => t.id === updatedTodo.id)
  todos[index] = updatedTodo
}

const deleteTodo = async (todo) => {
  const res = await fetch(`http://localhost:3005/api/todos/${todo.id}`, {
    method: 'DELETE'
  })

  if (res.ok) {
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
    <form class="row" @submit.prevent="createTodo">
      <div class="col-4">
        <input class="form-control" placeholder="Todo title" type="text" v-model="title" />
      </div>
      <div class="col-3"><button class="btn btn-primary" type="submit">Create</button></div>
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

        <button class="btn btn-danger" @click="deleteTodo(todo)">
          <i class="bi bi-trash3-fill"></i>
        </button>
      </li>
    </ul>
  </div>
</template>
