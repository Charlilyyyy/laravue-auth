<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView/>
  <nav>
    <ul>
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/login">Login</RouterLink></li>
      <li><RouterLink to="/register">Register</RouterLink></li>
      <li><RouterLink to="/dashboard">Dashboard</RouterLink></li>
    </ul>
  </nav>
</template>

<style scoped>
</style>
