<script setup>
import {reactive} from 'vue'
import {useAuthStore} from "@/store/AuthStore.js"
import TextInput from "@/components/TextInput.vue";
import InputLabel from "@/components/InputLabel.vue";
import SuccessButton from "@/components/SuccessButton.vue";
import InputError from "@/components/InputError.vue"
import Checkbox from "@/components/Checkbox.vue";
import Loader from "@/components/Loader.vue";

const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
  remember: false
})
</script>
<template>
  <div class="flex items-center justify-center h-screen">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6">Login to Your Account</h2>
      <!-- Login Form -->
      <form @submit.prevent="authStore.login(form)">
        <!-- Email Input -->
        <div class="mb-4">
          <InputLabel for="email" value="Email"/>

          <TextInput
              id="email"
              type="email"
              v-model="form.email"
              required
              autofocus
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
              autocomplete="current-password"
              placeholder="Enter your password"
          />

          <template v-if="authStore.errors.password">
            <InputError v-for="e in authStore.errors.password" class="mt-2" :message="e"/>
          </template>
        </div>

        <div class="mb-6 block">
          <label class="flex items-center">
            <Checkbox name="remember" v-model:checked="form.remember" />
            <span class="ms-2 text-sm text-gray-600"
            >Remember me</span
            >
          </label>
        </div>

        <!-- Login Button -->
        <div class="mb-4">
          <SuccessButton
              :class="{ 'opacity-25': authStore.processing }"
              :disabled="authStore.processing"
          >
            <Loader v-if="authStore.processing"/>
            Login
          </SuccessButton>
        </div>

        <!-- Forgot Password Link -->
        <div class="text-center text-sm text-gray-600">
          <RouterLink to="/forgot-password" class="hover:text-blue-600">Forgot your password?</RouterLink>
        </div>

        <!-- Register Link -->
        <div class="text-center text-sm text-gray-600 mt-4">
          Don't have an account?
          <RouterLink to="/register" class="text-blue-600 hover:text-blue-700 font-medium">Register</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>