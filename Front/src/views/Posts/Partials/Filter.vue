<script setup>
const emit = defineEmits(['hereEvent'])
const check = (e) => {
   emit('hereEvent', e.target.value)
}
</script>
<template>
  <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
      <div class="flex items-center ps-3">
        <input id="all" type="radio" value="all" checked name="list-radio" @change="check" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
        <label for="all" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">All</label>
      </div>
    </li>
    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
      <div class="flex items-center ps-3">
        <input id="today" type="radio" value="today" name="list-radio" @change="check" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
        <label for="today" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Today</label>
      </div>
    </li>
    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
      <div class="flex items-center ps-3">
        <input id="past" type="radio" value="past" name="list-radio" @change="check" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
        <label for="past" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Past</label>
      </div>
    </li>
  </ul>
</template>