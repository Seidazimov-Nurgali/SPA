import {defineStore} from "pinia"
import axiosInstance from "@/lib/axios.js"
import {computed, ref} from "vue"
import router from "@/router"
import {useToast} from "vue-toast-notification";

export const useAuthStore = defineStore('authStore', () => {
    const $toast = useToast();
    const user = ref(null)
    const isAuth = ref(false)
    const errors = ref({})
    const processing = ref(false)
    const isInitialized = ref(false)

    const getUser = computed(() => user.value)
    const getAuth = computed(() => isAuth.value)
    const getIsInitialized = computed(() => isInitialized.value)

    const setUser = (data) => {
        user.value = data
    }
    const setAuth = (data) => {
        isAuth.value = data
    }

    const clearErrors = () => {
        errors.value = {}
    }

    const attempt = async () => {
        if (isAuth.value) return
        
        try {
            const response = await axiosInstance.get('/api/user')
            setUser(response.data)
            setAuth(true)
            return true
        } catch (e) {
            cleanState()
            return false
        } finally {
            isInitialized.value = true
        }
    }

    const login = async (credentials) => {
        clearErrors()
        
        try {
            processing.value = true
            await axiosInstance.get('/sanctum/csrf-cookie')
            await axiosInstance.post('/login', credentials)
            
            const success = await attempt()
            if (success) {
                router.push('/dashboard')
                $toast.success('Successfully logged in!')
            }
        } catch (e) {
            handleAuthError(e)
        } finally {
            processing.value = false
        }
    }

    const register = async (credentials) => {
        clearErrors()
        
        try {
            processing.value = true
            await axiosInstance.get('/sanctum/csrf-cookie')
            await axiosInstance.post('/register', credentials)
            
            const success = await attempt()
            if (success) {
                router.push('/dashboard')
                $toast.success('Successfully registered! Please check your email for verification.')
            }
        } catch (e) {
            handleAuthError(e)
        } finally {
            processing.value = false
        }
    }

    const logout = async () => {
        try {
            await axiosInstance.post('/logout')
            cleanState()
            router.push('/login')
            $toast.success('Successfully logged out!')
        } catch (e) {
            // Even if logout fails on server, clean local state
            cleanState()
            router.push('/login')
            $toast.success('Successfully logged out!')
        }
    }

    const forgotPassword = async (email) => {
        clearErrors()
        
        try {
            processing.value = true
            await axiosInstance.post('/forgot-password', { email })
            $toast.success('Password reset link sent to your email!')
        } catch (e) {
            handleAuthError(e)
        } finally {
            processing.value = false
        }
    }

    const resetPassword = async (credentials) => {
        clearErrors()
        
        try {
            processing.value = true
            await axiosInstance.post('/reset-password', credentials)
            $toast.success('Password reset successfully! Please login with your new password.')
            router.push('/login')
        } catch (e) {
            handleAuthError(e)
        } finally {
            processing.value = false
        }
    }

    const handleAuthError = (error) => {
        if (error.response?.status === 422) {
            errors.value = error.response.data.errors
        } else if (error.response?.status === 401) {
            $toast.error('Invalid credentials. Please try again.')
        } else if (error.response?.status === 429) {
            $toast.error('Too many attempts. Please try again later.')
        } else if (error.response?.status >= 500) {
            $toast.error('Server error. Please try again later.')
        } else if (!error.response) {
            $toast.error('Network error. Please check your connection.')
        } else {
            $toast.error('An unexpected error occurred. Please try again.')
        }
    }

    const cleanState = () => {
        setUser(null)
        setAuth(false)
        clearErrors()
    }

    return {
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        attempt,
        getAuth,
        getUser,
        getIsInitialized,
        errors,
        processing,
        isAuth,
        user,
        isInitialized,
        cleanState,
        clearErrors
    }
}, {
    persist: {
        storage: localStorage, // Changed to localStorage for better UX
        pick: ['isAuth', 'user']
    }
})