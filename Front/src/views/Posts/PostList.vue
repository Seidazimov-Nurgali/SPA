<script setup>
import { TailwindPagination } from 'laravel-vue-pagination';
import axiosInstance from "@/lib/axios.js";
import {onMounted, ref, watch} from "vue";
import Loader from "@/components/Loader.vue";
import debounce from "lodash.debounce"
import Search from "@/views/Posts/Partials/Search.vue";
import Filter from "@/views/Posts/Partials/Filter.vue";

const posts = ref({})

const search = ref('')
const sortBy = ref('id')
const sortOrder = ref('asc')
const perPage = ref(10)
const filter = ref('')

const getResults = async (page = 1) => {
  const {data} = await axiosInstance.get('/api/posts', {
    params: {
      search: search.value,
      sortBy: sortBy.value,
      sortOrder: sortOrder.value,
      per_page: perPage.value,
      page: page
    }
  })
  posts.value = data
}

const sort = (column) => {
  if (sortBy.value === column) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = column
    sortOrder.value = 'asc'
  }
  getResults()
}

const filters = (val) => {
  filter.value = val
}

watch(search, getResults)

onMounted(getResults)

//FrontEnd Filter
// const filteredPosts = computed(() => {
//   switch (filter.value){
//     case 'today':
//       posts.value = posts.value.filter(post => new Date(post.created_at).getDate() === new Date().getDate())
//       break
//     case 'past':
//       posts.value = posts.value.filter(post => new Date(post.created_at).getDate() < new Date().getDate())
//       break
//   }
//
//   if (search.value !== '') {
//     posts.value = posts.value.filter(post =>
//       post.title.includes(search.value) ||
//       post.text.includes(search.value)
//     )
//   }
//   return posts.value
// })
</script>

<template>
  <div class="flex-1 p-8">
    <div class="pb-4">
      <RouterLink :to="{name: 'posts_create'}" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</RouterLink>
    </div>
    <section>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <Filter @myEvent="filters"/>
        <Search v-model="search"/>

        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3" @click="sort('id')">
              Id
            </th>
            <th scope="col" class="px-6 py-3" @click="sort('title')">
              Title
            </th>
            <th scope="col" class="px-6 py-3" @click="sort('text')">
              Body
            </th>
            <th scope="col" class="px-6 py-3" @click="sort('is_published')">
              Published?
            </th>
            <th scope="col" class="px-6 py-3" @click="sort('created_at')">
              Created by
            </th>
            <th scope="col" class="px-6 py-3">
              Actions
            </th>
          </tr>
          </thead>
          <Loader v-if="Object.keys(posts).length === 0"/>
          <tbody v-if="posts.data?.length > 0">
          <tr v-for="post in posts.data" :key="post.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <RouterLink :to="{name: 'posts_show', params: {'id': post.id} }">{{ post.id }}</RouterLink>
            </th>
            <td class="px-6 py-4">
              {{ post.title }}
            </td>
            <td class="px-6 py-4">
              {{ post.text }}
            </td>
            <td class="px-6 py-4">
              {{ post.is_published ? 'Yes' : 'No' }}
            </td>
            <td class="px-6 py-4">
              {{ post.user.name }} - {{ post.created_at }}
            </td>
            <td class="px-6 py-4">
              <RouterLink :to="{name: 'posts_edit', params: {'id': post.id} }" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</RouterLink>
            </td>
          </tr>
          </tbody>
        </table>
        <TailwindPagination
            :data="posts"
            @pagination-change-page="getResults"
        />
      </div>
    </section>
  </div>
</template>