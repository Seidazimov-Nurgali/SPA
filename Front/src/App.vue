<script setup>
import { onMounted, computed } from 'vue'
import { initFlowbite } from 'flowbite'
import {RouterView} from 'vue-router'
import Sidebar from "@/layouts/Sidebar.vue"
import Loader from "@/components/Loader.vue"
import { useAuthStore } from '@/store/AuthStore.js'

const authStore = useAuthStore()

const isInitialized = computed(() => authStore.getIsInitialized)

onMounted(async () => {
  // Initialize authentication state
  await authStore.attempt()
  // initFlowbite();
})
</script>

<template>
  <div v-if="!isInitialized" class="min-h-screen flex items-center justify-center">
    <Loader text="Initializing..." />
  </div>
  <div v-else>
    <Sidebar/>
    <RouterView/>
  </div>
</template>
