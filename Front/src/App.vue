<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import {RouterView} from 'vue-router'
import Sidebar from "@/layouts/Sidebar.vue"

// onMounted(() => {
//   initFlowbite();
// })
</script>

<template>
  <Sidebar/>
  <RouterView/>
</template>
