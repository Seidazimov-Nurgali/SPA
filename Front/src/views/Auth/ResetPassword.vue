<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset your password
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Enter your new password below.
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

        <div>
          <InputLabel for="password" value="New Password" />
          <TextInput
            id="password"
            type="password"
            class="mt-1 block w-full"
            v-model="form.password"
            required
            autocomplete="new-password"
          />
          <InputError :message="errors.password?.[0]" class="mt-2" />
        </div>

        <div>
          <InputLabel for="password_confirmation" value="Confirm Password" />
          <TextInput
            id="password_confirmation"
            type="password"
            class="mt-1 block w-full"
            v-model="form.password_confirmation"
            required
            autocomplete="new-password"
          />
          <InputError :message="errors.password_confirmation?.[0]" class="mt-2" />
        </div>

        <div>
          <InputLabel for="token" value="Reset Token" />
          <TextInput
            id="token"
            type="text"
            class="mt-1 block w-full"
            v-model="form.token"
            required
          />
          <InputError :message="errors.token?.[0]" class="mt-2" />
        </div>

        <SuccessButton
          :class="{ 'opacity-25': processing }"
          :disabled="processing"
          class="w-full"
        >
          <Loader v-if="processing" />
          <span v-else>Reset Password</span>
        </SuccessButton>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/store/AuthStore.js'
import InputError from '@/components/InputError.vue'
import InputLabel from '@/components/InputLabel.vue'
import TextInput from '@/components/TextInput.vue'
import SuccessButton from '@/components/SuccessButton.vue'
import Loader from '@/components/Loader.vue'

const route = useRoute()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: '',
  password_confirmation: '',
  token: ''
})

const { errors, processing, resetPassword } = authStore

onMounted(() => {
  // Get token and email from URL parameters
  form.value.token = route.query.token || ''
  form.value.email = route.query.email || ''
})

const handleSubmit = async () => {
  await resetPassword(form.value)
}
</script> 