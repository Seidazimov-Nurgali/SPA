<script setup>
import InputLabel from "@/components/InputLabel.vue";
import TextInput from "@/components/TextInput.vue";
import InputError from "@/components/InputError.vue";
import SuccessButton from "@/components/SuccessButton.vue";
import Loader from "@/components/Loader.vue";
import {usePostStore} from "@/store/PostStore.js";
import {reactive, ref} from "vue";

const imagePreview = ref(null);
const selectedFile = ref(null);

// Обработчик изменения файла
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    previewFile(file);
    selectedFile.value = file;  // Сохраняем выбранный файл
  }
};

// Обработчик перетаскивания файла
const handleDrop = (event) => {
  const file = event.dataTransfer.files[0];
  if (file) {
    previewFile(file);
    selectedFile.value = file;  // Сохраняем выбранный файл
  }
};

// Функция для предварительного просмотра изображения
const previewFile = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

// Отправка формы
// const submitForm = async () => {
//   if (!selectedFile.value) {
//     alert('Пожалуйста, выберите файл');
//     return;
//   }
//
//   const formData = new FormData();
//   formData.append('image', selectedFile.value);
//
//   try {
//     const response = await axios.post('/api/upload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     console.log('Файл успешно загружен', response.data);
//   } catch (error) {
//     console.error('Ошибка при загрузке файла', error);
//   }
// };

const postStore = usePostStore()
const form = reactive({
  title: '',
  text: ''
})
</script>
<template>
  <div class="flex items-center justify-center h-screen">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6">Create Post</h2>
      <form @submit.prevent="postStore.store(form)">
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

          <textarea
              id="text"
              rows="4"
              v-model="form.text"
              class="mt-1 block p-2.5 w-full rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter text..."></textarea>

          <template v-if="postStore.errors?.text">
            <InputError v-for="e in postStore.errors.text" class="mt-2" :message="e"/>
          </template>
        </div>

<!--        <div @dragover.prevent @drop="handleDrop" class="mb-4 flex items-center justify-center w-full">-->
<!--          <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">-->
<!--            <div class="flex flex-col items-center justify-center pt-5 pb-6">-->
<!--              <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">-->
<!--                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>-->
<!--              </svg>-->
<!--              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>-->
<!--              <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>-->
<!--              <div v-if="imagePreview">-->
<!--                <img :src="imagePreview" alt="Preview" />-->
<!--              </div>-->
<!--            </div>-->
<!--            <input ref="fileInput" @change="handleFileChange" multiple id="dropzone-file" type="file" class="hidden" />-->
<!--          </label>-->
<!--        </div>-->

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
<style scoped>
.drop-zone {
  border: 2px dashed #007BFF;
  padding: 20px;
  text-align: center;
  cursor: pointer;
}
</style>