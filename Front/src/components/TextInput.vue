<script setup>
import {ref, onMounted} from "vue"

const element = defineModel({
  required: true
})

const input = ref(null);

onMounted(() => {
  if (input.value.hasAttribute('autofocus')) {
    input.value.focus();
  }
});

defineExpose({ focus: () => input.value.focus() });
</script>
<template>
  <input
      class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      v-model="element"
      ref="input"
  >
</template>