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
  <div>
    <h1>Todo App</h1>
    <form @submit.prevent="createTodo">
      <input placeholder="Todo title" type="text" v-model="title" />
      <button type="submit">Create</button>
    </form>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input type="checkbox" v-model="todo.completed" @click="completeTodo(todo)" />
        <span :class="{ completed: todo.completed }">{{ todo.title }}</span>
        <button @click="deleteTodo(todo)">Delete</button>
      </li>
    </ul>
  </div>
</template>
