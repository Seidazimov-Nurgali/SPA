<script setup>
import InputLabel from "@/components/InputLabel.vue";
import TextInput from "@/components/TextInput.vue";
import InputError from "@/components/InputError.vue";
import SuccessButton from "@/components/SuccessButton.vue";
import Loader from "@/components/Loader.vue";
import {usePostStore} from "@/store/PostStore.js";
import {reactive, watch} from "vue";
import {useRoute} from "vue-router"

const route = useRoute()
const postStore = usePostStore()

watch(() => route.params.id,
    (id) => postStore.getPost(id), {immediate: true})

const form = reactive({
  title: postStore.post?.title,
  text: postStore.post?.text
})

const handleUpdate = (payload) => {
  postStore.update(route.params.id, payload)
}
</script>
<template>
  <div class="flex items-center justify-center h-screen">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6">Update Post</h2>
      <form @submit.prevent="handleUpdate(form)">
        <div class="mb-4">
          <InputLabel for="title" value="Title"/>

          <TextInput
              id="title"
              type="text"
              v-model="form.title"
              required
              autofocus
              autocomplete="title"
              placeholder="Enter title"
          />

          <template v-if="postStore.errors?.title">
            <InputError v-for="e in postStore.errors.title" class="mt-2" :message="e"/>
          </template>
        </div>

        <div class="mb-4">
          <InputLabel for="text" value="Text"/>

          <TextInput
              id="text"
              v-model="form.text"
              required
              placeholder="Enter text"
          />

          <template v-if="postStore.errors?.text">
            <InputError v-for="e in postStore.errors.text" class="mt-2" :message="e"/>
          </template>
        </div>

        <div class="mb-4">
          <SuccessButton
              :class="{ 'opacity-25': postStore.processing }"
              :disabled="postStore.processing"
          >
            <Loader v-if="postStore.processing"/>
            Save
          </SuccessButton>
        </div>

        <div class="text-center text-sm text-gray-600">
          <RouterLink to="/posts" class="hover:text-blue-600">Cancel</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>