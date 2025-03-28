<script setup>
import {RouterLink} from "vue-router"
import {useAuthStore} from "@/store/AuthStore.js";

const authStore = useAuthStore()
</script>
<template>
  <div class="bg-gray-900 text-white p-4">
    <div class="flex items-center justify-between">
      <!-- Logo or App Title -->
      <div class="text-2xl font-bold">
        <RouterLink to="/">Single Page App</RouterLink>
      </div>

      <!-- Navigation Links -->
      <div class="flex space-x-8">
        <RouterLink to="/about" class="hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors">About</RouterLink>
        <template v-if="authStore.getAuth">
          <RouterLink to="/dashboard" class="hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors">Dashboard</RouterLink>
          <RouterLink :to="{name: 'posts'}" class="hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors">Posts</RouterLink>
          <a @click.prevent="authStore.logout()" href="" class="hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors">Logout</a>
        </template>
        <template v-else>
          <RouterLink to="/login" class="hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors">Login</RouterLink>
          <RouterLink to="/register" class="hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors">Register</RouterLink>
        </template>
      </div>
    </div>
  </div>
</template>