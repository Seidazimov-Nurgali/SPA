<script setup>
import {usePostStore} from "@/store/PostStore.js";
import {useRoute} from "vue-router"
import {watch} from "vue";

const route = useRoute()
const postStore = usePostStore()

watch(() => route.params.id, (id) => postStore.getPost(id), {immediate: true})
</script>

<template v-if="postStore.post">
  <h1>Title: {{ postStore.post?.title }}</h1>
  <p>Text: {{ postStore.post?.text }}</p>
  <p>Created by: {{ postStore.post?.user?.name }} - {{ postStore.post?.created_at }}.</p>
</template>