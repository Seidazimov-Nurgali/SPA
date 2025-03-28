import axios from "axios"
import {useAuthStore} from "@/store/AuthStore.js";
import router from '@/router'
import {useToast} from "vue-toast-notification";

const axiosInstance = axios.create({
    withCredentials: true,
    withXSRFToken: true,
    baseURL: 'http://localhost:8000'
})

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const authStore = useAuthStore()
        const $toast = useToast();

        switch (error.response.status) {
            case 401:
                authStore.cleanState()
                $toast.error('Unauthorized')
                router.push('/login')
                break
            case 404:
                $toast.error('Page not found')
                router.push('/404')
                break
            case 419:
                authStore.cleanState()
                $toast.error('Unauthorized')
                router.push('/login')
                break
            case 500:
                $toast.error('Server Error')
                router.push('/500')
                break
        }
        return Promise.reject(error)
    }
)
export default axiosInstance