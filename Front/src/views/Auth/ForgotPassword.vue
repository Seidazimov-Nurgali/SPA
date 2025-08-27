<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Forgot your password?
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div>
          <InputLabel for="email" value="Email" />
          <TextInput
            id="email"
            type="email"
            class="mt-1 block w-full"
            v-model="form.email"
            required
            autofocus
            autocomplete="email"
          />
          <InputError :message="errors.email?.[0]" class="mt-2" />
        </div>

        <div class="flex items-center justify-between">
          <RouterLink
            :to="{ name: 'login' }"
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Back to login
          </RouterLink>
        </div>

        <SuccessButton
          :class="{ 'opacity-25': processing }"
          :disabled="processing"
          class="w-full"
        >
          <Loader v-if="processing" />
          <span v-else>Send Password Reset Link</span>
        </SuccessButton>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/store/AuthStore.js'
import InputError from '@/components/InputError.vue'
import InputLabel from '@/components/InputLabel.vue'
import TextInput from '@/components/TextInput.vue'
import SuccessButton from '@/components/SuccessButton.vue'
import Loader from '@/components/Loader.vue'

const authStore = useAuthStore()

const form = ref({
  email: ''
})

const { errors, processing, forgotPassword } = authStore

const handleSubmit = async () => {
  await forgotPassword(form.value)
}
</script>
