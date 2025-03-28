import {defineStore} from "pinia"
import axiosInstance from "@/lib/axios.js"
import {computed, ref} from "vue"
import router from "@/router"
import {useToast} from "vue-toast-notification";
export const useAuthStore = defineStore('authStore', () => {
    const $toast = useToast();
    const user = ref(null)
    const isAuth = ref(false)

    const errors = ref('')
    const processing = ref(false)

    const getUser = computed(() => user.value)
    const getAuth = computed(() => isAuth.value)

    const setUser = (data) => {
        user.value = data
    }
    const setAuth = (data) => {
        isAuth.value = data
    }

    const attempt = async () => {
        if (isAuth.value) return
        try {
            let response = await axiosInstance.get('/api/user')
            setUser(response.data)
            setAuth(true)
        } catch (e) {
            cleanState()
        }
    }
    const login = async (credentials) => {
        await axiosInstance.get('/sanctum/csrf-cookie')
        try {
            processing.value = true
            await axiosInstance.post('/login', credentials)
            await attempt()
            router.push('/dashboard')
            $toast.success('Successfully logged in!')
        } catch (e) {
            if (e.response?.status === 422){
                errors.value = e.response.data.errors
            }
        } finally {
            processing.value = false
        }
    }

    const register = async (credentials) => {
        await axiosInstance.get('/sanctum/csrf-cookie')
        try {
            processing.value = true
            await axiosInstance.post('/register', credentials)
            await attempt()
            router.push('/dashboard')
            $toast.success('Successfully registered!')
        } catch (e) {
            if (e.response?.status === 422){
                errors.value = e.response.data.errors
            }
        } finally {
            processing.value = false
        }
    }

    const logout = async () => {
        await axiosInstance.post('/logout')
        cleanState()
        router.push('/login')
        $toast.success('Successfully logged out!')
    }

    const cleanState = () => {
        setUser(null)
        setAuth(false)
    }

    return {
        login,
        register,
        logout,
        getAuth,
        getUser,
        attempt,
        errors,
        processing,
        isAuth,
        user,
        cleanState
    }
}, {
    persist: {
        storage: sessionStorage,
        pick: ['isAuth', 'user']
    }
})