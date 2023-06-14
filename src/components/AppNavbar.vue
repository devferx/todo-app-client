<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav
    class="navbar navbar-expand-lg bg-body-tertiary navbar bg-dark border-bottom border-bottom-dark"
    data-bs-theme="dark"
  >
    <div class="container-fluid d-flex align-items">
      <a class="navbar-brand" href="#">Todo App</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" active-class="active" to="/" aria-current="page">
              Home
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/about" active-class="active"> About </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
