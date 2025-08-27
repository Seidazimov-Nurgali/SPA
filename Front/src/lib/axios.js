import axios from "axios"
import {useAuthStore} from "@/store/AuthStore.js";
import router from '@/router'
import {useToast} from "vue-toast-notification";

const axiosInstance = axios.create({
    withCredentials: true,
    withXSRFToken: true,
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000'
})

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const authStore = useAuthStore()
        const $toast = useToast();

        // Don't show toast for auth errors that are already handled
        const isAuthRoute = router.currentRoute.value.meta?.forGuests

        switch (error.response?.status) {
            case 401:
                if (!isAuthRoute) {
                    authStore.cleanState()
                    $toast.error('Session expired. Please login again.')
                    router.push('/login')
                }
                break
            case 403:
                $toast.error('Access denied. You don\'t have permission to perform this action.')
                break
            case 404:
                if (!isAuthRoute) {
                    $toast.error('Page not found')
                    router.push('/404')
                }
                break
            case 419:
                if (!isAuthRoute) {
                    authStore.cleanState()
                    $toast.error('Session expired. Please login again.')
                    router.push('/login')
                }
                break
            case 422:
                // Validation errors are handled in components
                break
            case 429:
                $toast.error('Too many requests. Please try again later.')
                break
            case 500:
                if (!isAuthRoute) {
                    $toast.error('Server Error')
                    router.push('/500')
                }
                break
            default:
                if (error.response?.status >= 500) {
                    $toast.error('Server error. Please try again later.')
                } else if (!error.response) {
                    $toast.error('Network error. Please check your connection.')
                }
                break
        }
        return Promise.reject(error)
    }
)

export default axiosInstance