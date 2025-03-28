<script setup>
import {useAuthStore} from "@/store/AuthStore.js";
import {onMounted} from "vue";

const authStore = useAuthStore()

onMounted(() => {
    authStore.attempt()
})
</script>

<template>
  <div class="flex-1 p-8">
    <h1 class="text-3xl font-bold mb-4">Dashboard</h1>
    <p>Welcome, {{ authStore.getUser?.name }}!</p>
  </div>
</template>
