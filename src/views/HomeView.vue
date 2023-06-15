<script setup>
import { ref, onMounted, reactive } from 'vue'

const todos = reactive([])
const title = ref('')
const editTodoId = ref(null)

const fetchTodos = async () => {
  const res = await fetch('http://localhost:3005/api/todos')
  const data = await res.json()
  todos.push(...data)
}

const mutateTodo = async () => {
  if (!title.value) return

  if (editTodoId.value) {
    const res = await fetch(`http://localhost:3005/api/todos/${editTodoId.value}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title.value })
    })

    const updatedTodo = await res.json()
    const index = todos.findIndex((t) => t.id === updatedTodo.id)
    todos[index] = updatedTodo
    title.value = ''
    editTodoId.value = null
    return
  }

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

const editTodo = (todo) => {
  title.value = todo.title
  editTodoId.value = todo.id
}

const cancelEdit = () => {
  title.value = ''
  editTodoId.value = null
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
