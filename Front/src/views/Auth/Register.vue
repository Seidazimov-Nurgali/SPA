<script setup>
import {reactive} from 'vue'
import {useAuthStore} from "@/store/AuthStore.js"
import TextInput from "@/components/TextInput.vue";
import InputLabel from "@/components/InputLabel.vue";
import SuccessButton from "@/components/SuccessButton.vue";
import InputError from "@/components/InputError.vue";
import Loader from "@/components/Loader.vue";

const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
  name: '',
  password_confirmation: ''
})

</script>
<template>
  <div class="flex items-center justify-center h-screen">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6">Register</h2>
      <!-- Login Form -->
      <form @submit.prevent="authStore.register(form)">
        <!-- Email Input -->
        <div class="mb-4">
          <InputLabel for="name" value="Name"/>

          <TextInput
              id="name"
              type="text"
              v-model="form.name"
              required
              autofocus
              autocomplete="name"
              placeholder="Enter your name"
          />

          <template v-if="authStore.errors.name">
            <InputError v-for="e in authStore.errors.name" class="mt-2" :message="e"/>
          </template>
        </div>

        <div class="mb-4">
          <InputLabel for="email" value="Email"/>

          <TextInput
              id="email"
              type="email"
              v-model="form.email"
              required
              autocomplete="username"
              placeholder="Enter your email"
          />

          <template v-if="authStore.errors.email">
            <InputError v-for="e in authStore.errors.email" class="mt-2" :message="e"/>
          </template>
        </div>

        <!-- Password Input -->
        <div class="mb-4">
          <InputLabel for="password" value="Password"/>

          <TextInput
              id="password"
              type="password"
              v-model="form.password"
              required
              autocomplete="new-password"
              placeholder="Enter your password"
          />

          <template v-if="authStore.errors.password">
            <InputError v-for="e in authStore.errors.password" class="mt-2" :message="e"/>
          </template>
        </div>

        <div class="mb-6">
          <InputLabel
              for="password_confirmation"
              value="Confirm Password"
          />

          <TextInput
              id="password_confirmation"
              type="password"
              v-model="form.password_confirmation"
              required
              autocomplete="new-password"
              placeholder="Confirm your password"
          />

          <template v-if="authStore.errors.password_confirmation">
            <InputError v-for="e in authStore.errors.password_confirmation" class="mt-2" :message="e"/>
          </template>
        </div>

        <div class="mb-4">
          <SuccessButton
              :class="{ 'opacity-25': authStore.processing }"
              :disabled="authStore.processing"
          >
            <Loader v-if="authStore.processing"/>
            Register
          </SuccessButton>
        </div>

        <div class="text-center text-sm text-gray-600 mt-4">
          Already registered?
          <RouterLink to="/login" class="text-blue-600 hover:text-blue-700 font-medium">Login</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>